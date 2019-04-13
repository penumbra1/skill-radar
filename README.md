I love data visualisation, and I've started to explore how to do it in React. For this job profile dashboard, I'm using the awesome [react-vis](https://uber.github.io/react-vis/) library.

The data comes from the [Open Skills API](https://github.com/workforce-data-initiative/skills-api).

## Under the hood

The input populates asynchronously. I started out with [react-select](https://github.com/JedWatson/react-select), but switched to [Ant design](https://ant.design/) (Antd) as its select component is better at handling long lists.

Antd came in useful for the rest of the UI as well. I rewired CRA to override Antd's default theme via [craco-antd](https://github.com/FormAPI/craco-antd).

There's an open issue with Antd importing [the entire icon pack](https://github.com/ant-design/ant-design/issues/12011)), which will probably be [fixed](https://github.com/ant-design/ant-design/issues/12011#issuecomment-433775872) soon. I'm grabbing the icons manually for now, as suggested [here](https://github.com/ant-design/ant-design/issues/12011#issuecomment-423470708).

I added a custom loader to the input and the graphs. It receives the colors for @keyframes as locally scoped CSS variables via props.

## Issues

### Styles

I wanted the illustration to dim along with the text when data is loading, but to stay in place when tabs change. As antd tab animation relies on margins, I had to render the illustration via a React portal to keep it from moving and constrain it to the content area.

### Data

Ideally, jobs should be compared across the same subset of skills, e.g. top 10 skills across all jobs. Looks like there is [no way to get a list of top skills by overall frequency](https://github.com/workforce-data-initiative/skills-api/issues/30) (except for crunching the dataset myself). Currently the profile graph shows top 15 skills by importance for each particular job. However, as top skills differ across jobs, the y-axis ticks change almost every time the job is updated. The smooth bar chart transition essentially makes no sense when dimensions change. I really don't like it, but I'm not up to data analysis for now:)

Related jobs have the same skill profile, but I show profiles for them anyway (it would be nice to have more granular data).

## In progress

- job comparison via a [parallel coordinates](https://uber.github.io/react-vis/documentation/other-charts/parallel-coordinates) chart
- related jobs

Todo:

- memoization & pure components
- intersection observer for related jobs animation
- routing by occupation
