# INT×Power

## Info about the app

The article associated with this app can be found here: [https://osf.io/xhe3u/](https://osf.io/xhe3u/)

Conducting an appropriate power analysis for first-order interactions is difficult, because the expected effect size of an interaction depends on its shape and the size of the simple slopes. INT×Power enables users to draw the shape of their first-order interaction while keeping an eye on the effect sizes of the simple slopes. It will calculate the sample size needed to reach a power of .80 with and without using three strategies to maximize power: (i) preregistering a one-tailed test, (ii) using a mixed design (i.e., the predictor or the moderator is a within- participant variable), and (iii) preregistering contrast analysis for a fully attenuated interaction (using specific contrast weights rather than using the product term between the moderator and predictor).

We recommend using the following empirically derived benchmarks to describe small, medium, and large simple effects: d = 0.20, 0.35, and 0.50, respectively ([see Schäfer & Schwarz, 2019](https://doi.org/10.3389/fpsyg.2019.00813))

The calculation of the required sample size assumes approximate multivariate normality, homogeneity of variance across subgroups, independence of residual error, lack of severe multicollinearity, and equal sample size across the 2 × 2 subgroups.

The app can be used to calculate the required sample size to detect two-way interactions involving continuous and/or dichotomous predictors/moderators, assuming that there is no measurement error (measurement error would diminish effect sizes).

For the calculation involving mixed-participants designs, sphericity is assumed to be satisfied and the by-default correlation between the measurements is assumed to be ρ = .50 (a conservative estimate; [see Brysbaert, 2019](http://doi.org/10.5334/joc.72)).

The app can be used to calculate the required sample size to detect two-way interactions involving both dichotomous predictors/moderators, and continuous predictors/moderators (at ± 1 SD), although other applications such as [InteractionPoweR](https://david-baranger.shinyapps.io/InteractionPoweR_analytic/) may offer more flexibility (e.g., allowing users to change the value of measurement error and correlations between variables).

## Run the app

### Install

Install dependencies:

```
yarn install
```

### Run the app

Simply start the app with following command:

```
yarn start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.