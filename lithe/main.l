; seems like we can destructure with the `let` form but not the `define` form
(let ((_ T) |{...}|)
  (define addon-name _)
  (define addon-env T)
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

(let (scroll nil)
  (define show-gui ()
    (if
      (and scroll (: scroll IsShown)) (: scroll Hide)
      (and scroll (not (: scroll IsShown))) (: scroll Show)
      (let (input (CreateFrame 'EditBox))
        (set scroll (CreateFrame 'ScrollFrame  nil UIParent 'UIPanelScrollFrameTemplate))
        (: scroll SetSize 300 200)
        (: scroll SetPoint 'CENTER)

        (: input SetMultiLine true)
        (: input SetFontObject ChatFontNormal)
        (: input SetWidth 300)
        (: input SetHeight 300)
        (: input SetAutoFocus false) ; without this we can't unfocus
        (: scroll SetScrollChild input)))))

(define-global SLASH_LITHE_GUI1 '/lithe)
(set (get SlashCmdList 'LITHE_GUI) show-gui)

(define-global SLASH_LITHE_EVAL1 '/lt)
(set (get SlashCmdList 'LITHE_EVAL) run-string)
