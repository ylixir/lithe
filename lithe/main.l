; seems like we can destructure with the `let` form but not the `define` form
(let ((_ T) |{...}|)
  (define addon-name _)
  (define addon-env T)
)
(print "lumen alive")
(print addon-name)
(print 'environment)
(print addon-env)
