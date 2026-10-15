# Standard library reference

Import with `use p-<name> as alias`. Generated from `pkg/stdlib/*.js`; regenerate when modules change.

- **p-array**: isarray from of len first last range flatten unique zip unzip chunk sum product min max sortasc sortdesc compact count groupby
- **p-datetime**: now today timestamp create utccreate fromiso year month day weekday hour minute second ms utc* tz* toiso tolocale todate totime format addms addseconds addminutes addhours adddays diff diffdays diffhours diffminutes diffseconds offset localtz
- **p-error**: create type range reference syntax uri iserror message name stack cause wrap
- **p-json**: parse stringify prettify (spreads the global `JSON`)
- **p-map**: create from fromobject get set delete has size keys values entries clear toobject merge
- **p-math**: pi e ln2 ln10 log2e log10e sqrt2 sqrt1_2 (spreads the global `Math`)
- **p-number**: isfinite isinteger isnan issafe parsefloat parseint tofixed toprecision toexponential tostring clamp (spreads `Number`)
- **p-object**: keys values entries fromentries assign freeze seal isfrozen issealed hasown create is len merge clone pick omit
- **p-promise**: resolve reject all allsettled race any create delay timeout
- **p-random**: random randint randrange randbool getrandbits randbytes normalvariate uniform triangular gauss expovariate gammavariate betavariate lognormvariate vonmisesvariate paretovariate weibullvariate choice choices wchoices shuffle sample binomial poisson geometric clamp lerp
- **p-regexp**: create test match matchall exec replace replaceall split source flags escape
- **p-set**: create from add delete has size values union intersection difference symmetricdifference issubset issuperset isdisjoint clear toarray
- **p-string**: len contains startswith endswith indexof count upper lower capitalize title trim trimstart trimend reverse repeat replace replacefirst padstart padend split lines words join chars slice charat codeat fromcode
