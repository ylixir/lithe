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
