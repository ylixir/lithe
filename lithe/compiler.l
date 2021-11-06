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
(let ((addon-name T) |{...}|) (define addon-env T))

;; the makefile will splice lumen/xxx.l into the LUMEN_XXX below
;; but the env variables should be on their own line to prevent
;; things like comments from mutilating the syntax

(set (get addon-env 'runtime) ((fn () (do
$LUMEN_RUNTIME
))))

(set (get addon-env 'macros) ((fn () (do
$LUMEN_MACROS
))))

(set (get addon-env 'reader) ((fn () (do
$LUMEN_READER
))))

(set (get addon-env 'compiler) ((fn () (do
$LUMEN_COMPILER
))))
