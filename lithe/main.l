;;; Lithe: A LISP programming environment for use in World of Warcraft
;;; Copyright (C) 2021  Jon Allen <jon@ylixir.io>
;;; 
;;; This program is free software: you can redistribute it and/or modify
;;; it under the terms of the GNU Affero General Public License as published by
;;; the Free Software Foundation, either version 3 of the License, or
;;; (at your option) any later version.
;;; 
;;; This program is distributed in the hope that it will be useful,
;;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;;; GNU Affero General Public License for more details.
;;; 
;;; You should have received a copy of the GNU Affero General Public License
;;; along with this program.  If not, see <https://www.gnu.org/licenses/>.
;;; 
;;; If your software can interact with users remotely through a computer
;;; network, you should also make sure that it provides a way for users to
;;; get its source.  For example, if your program is a web application, its
;;; interface could display a "Source" link that leads users to an archive
;;; of the code.  There are many ways you could offer source, and different
;;; solutions will be better for different programs; see section 13 for the
;;; specific requirements.

; seems like we can destructure with the `let` form but not the `define` form
(let ((name env) |{...}|)
  (define addon-name name)
  (define addon-env env)
)

; why doesn't this work with the macro from macros.l?
; it is literally copy pasted (with debug/traceback checks)?
(define-macro wow-guard (expr)
  `(list (xpcall
           (fn () ,expr)
           (fn (m)
               (if (obj? m) m
                 ; WoW doesn't have a debug table
                 (obj
                   stack: (debugstack)
                   message: (if
                              (string? m) (clip m (+ (or (search m ": ") -2) 2))
                              (nil? m) ""
                              (str m))))))))

; this is just a middleware function to log the results of a guard
; it doesn't change them, only passes them through
(define guard-log ((ok err))
  (if
    (not ok) (let ((:message :stack) err)
               (print (cat "error: " message "\n" stack)))
    (is? v) (print (str v)))
  (list ok err))

; simulate the : sugar in lua
(define-macro :
              (object function :rest)
              `((get ,object ',function) ,object ,@rest))

; thread-first/pipe macro
(define-macro -> (value rest: functions)
  (if
    (none? functions) value
    (let (
          ((f rest: parameters) :rest) functions
          new-value `(,f ,value ,@parameters))
      `(-> ,new-value ,@rest))))

; thread-last/pipe macro
(define-macro ->> (value rest: functions)
  (if
    (none? functions) value
    (let (
          ((f rest: parameters) :rest) functions
          new-value `(,f ,@parameters ,value))
      `(-> ,new-value ,@rest))))

(let (
      (:compile :expand :run) (get addon-env 'compiler)
      (:read-string :stream :read-all) (get addon-env 'reader))
  (define-global %lithe-repl-result)
  (define run-string (s)
      (set %lithe-repl-result nil)
      (->> s
         ;(read-string) this only evaluates one expression
         (stream)
         (read-all)
         ; wrapping our code in a do block prevents nil
         ; errors from passing an implicit list of
         ; expressions instead of a single expression
         ; wrapping our code in an assignment prevents
         ; lua from puking on things liike `(+ 1 1)`
         ((fn (v) (expand `(set %lithe-repl-result (do ,@v)))))
         (compile)
         (run)
         (wow-guard)
         (guard-log))
      (if (is? %lithe-repl-result) (print (str %lithe-repl-result)))))

(let (lithe-gui-frame nil)
  (define toggle-gui ()
    (if
      (and lithe-gui-frame (: lithe-gui-frame IsShown)) (: lithe-gui-frame Hide)
      (and lithe-gui-frame (not (: lithe-gui-frame IsShown))) (: lithe-gui-frame Show)
      (let (frame (CreateFrame 'Frame  nil UIParent 'BackdropTemplate)
            scroll (CreateFrame 'ScrollFrame  nil frame 'UIPanelScrollFrameTemplate)
            input (CreateFrame 'EditBox) ; childframe != scrollchild
            ; scroll-texture (: scroll CreateTexture)
            close-button (CreateFrame 'Button nil  frame 'UIPanelCloseButton)
            run-button (CreateFrame 'Button nil  frame 'UIPanelButtonTemplate))

        (: frame SetBackdrop
           (list
             bgFile: "Interface/DialogFrame/UI-DialogBox-Background"
             edgeFile: "Interface/DialogFrame/UI-DialogBox-Border"
             tile: true
             insets: (list left: 10 right: 10 top: 10 bottom: 10)
             ))
        (: frame SetSize 500 500)
        (: frame SetPoint 'CENTER)

        (: run-button SetPoint 'TOPLEFT frame 'TOPLEFT 15 -15)
        (: run-button SetText 'run)
        (: run-button SetScript 'OnClick
           (fn ()
               (run-string (: input GetText))))

        ; there seems to  be some magic associated with the close button
        ; and it just works without us having to wire up messages
        (: close-button SetPoint 'TOPRIGHT frame 'TOPRIGHT -10 -10)

        ; for some reason the scroll bars are sticking out
        ; hopefully the scrollbar is about the size of the close button
        (: scroll SetPoint 'TOPRIGHT close-button 'BOTTOMLEFT)
        (: scroll SetPoint 'BOTTOMLEFT frame 'BOTTOMLEFT 20 20)
        ; (: scroll-texture SetAllPoints scroll)
        ; (: scroll-texture SetColorTexture 0.8 0.7 0.7 0.7)
        (: scroll SetScript 'OnMouseUp
           (fn ()
                 (: input SetCursorPosition (: input GetNumLetters))
                 (: input SetFocus)))

        (: input SetMultiLine true)
        (: input SetFontObject ChatFontNormal)
        (: input SetWidth (: scroll GetWidth))
        (: input SetAutoFocus false) ; without this we can't unfocus

        ; note that the scrollchild is different than a normal parent-child
        (: scroll SetScrollChild input)

        (set lithe-gui-frame frame)
        ))))

(define-global SLASH_LITHE_GUI1 '/lithe)
(set (get SlashCmdList 'LITHE_GUI) toggle-gui)
(toggle-gui) ; temporary while we work on it

(define-global SLASH_LITHE_EVAL1 '/lt)
(set (get SlashCmdList 'LITHE_EVAL) run-string)
