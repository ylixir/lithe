; seems like we can destructure with the `let` form but not the `define` form
(let ((_ T) |{...}|)
  (define addon-name _)
  (define addon-env T)
)

(define compile (get (get addon-env 'compiler) 'compile))
(define expand (get (get addon-env 'compiler) 'expand))
(define run (get (get addon-env 'compiler) 'run))
(define read-string (get (get addon-env 'reader) 'read-string))

(define test-code "(do
(define-macro test (in) `(+ ,in 1))
(print (test 1)))")

(let (body (read-string test-code)
           form (expand body)
           result (compile form))
  (print "with read-string")
  (print result)
  (run result))
