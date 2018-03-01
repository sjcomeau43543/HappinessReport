Happiness
===

Basic Information
---
- Project title: Happiness
- Authors: Samuel Coache, Samantha Comeau, William Schwartz
- Emails: sccoache@wpi.edu, sjcomeau@wpi.edu, wrschwartz@wpi.edu
- Github Usernames: sccoache, sjcomeau43543, williambannas
- Repository: https://github.com/sjcomeau43543/DataVisFinal
- Visualization: https://sjcomeau43543.github.io/DataVisFinal/
- video: https://www.youtube.com/watch?v=BOrOJ-dzpkg

Overview
---
For this project we created a webpage that allows people to interact and see why some countries are happier than others. To complete this task we started collecting readily available country specific metrics that we believed  could cause a certain country’s inhabitants to be relatively more or less happy. The data that we gathered was the reported average reported happiness by country, total population, Gross Domestic Product (GDP), inflation, unemployment, and alcohol consumption, all of this data was gathered from the year 2008 to 2016. We wanted to present this data in a way that would allow people to engage, and explore on their own. We broke our visualization into three distinct sections:
The first is a choropleth map showing the reported happiness of each country using a blue gradient. Darker blue being happier, and lighter blue meaning a country is less happy. Users are able to click through years, and see how reported happiness changes, as well as compare happiness visually to adjacent countries, by clicking on the country, hovering over a Country brings up a tooltip displaying the reported value.
The second interaction was our most experimental interaction. We created a cluster chart of all the countries with reported happiness data. Using the same blue color scale from the map to relate to the reported happiness. We also arranged the data in this chart to show the countries organized from unhappy to happy. Hovering over these points displays a tooltip, which like previous displays the country name and the reported happiness score. Sliders for each of our factors are presented on the side of cluster chart and are used to filter counties that are displayed, and give the user a chance to explore and look for correlation between factors on their own.
The third section, is a series of sorted colored bar charts, where the color corresponds to the value, presenting the data this way gives the user somewhat of an indication of the distribution of each of the factors very quickly. The graphic also serves to show easily how countries rank in specific categories. When hovering over a specific bar, you the bar gets highlighted, and the same country also gets highlighted in all the other factors charts, and  see how countries compare to one another. Like in the other sections the mouse over also displays a tooltip, to show the country name as well as well as displaying the value of that factor selected.



Outside Libraries/References
---
http://d3js.org/d3.v4.min.js
https://d3js.org/d3-scale-chromatic.v1.min.js
https://d3js.org/topojson.v1.min.js
https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
---

Teams
---
Samuel - Data cleaning, Stylistic Decision Making, Refining of Visualizations
Samantha - Project Management, Creating Visualizations, Data Processing
William - Created Visualizations, Made Interactions, Data Exploration

Requirements
---
Code - All web site files and libraries assuming they are not too big to include
Data - Include all the data that you used in your project. If the data is too large for github store it on a cloud storage provider, such as Dropbox or Yousendit.
Process Book- Your Process Book in PDF format.
README - The README file must give an overview of what you are handing in: which parts are your code, which parts are libraries, and so on. The README must contain URLs to your project websites and screencast videos. The README must also explain any non-obvious features of your interface.
GitHub Details
Fork the repo. You now have a copy associated with your username.
Make changes to index.html to fulfill the project requirements.
Make sure your "master" branch matches your "gh-pages" branch. See the GitHub Guides referenced above if you need help.
Edit the README.md with a link to your gh-pages site: for example http://YourUsernameGoesHere.github.io/DataVisFinal/index.html
To submit, make a Pull Request on the original repository.
Grading
Process Book - Are you following a design process that is well documented in your process book?
Solution - Is your visualization effective in answering your intended questions? Was it designed following visualization principles?
Implementation - What is the quality of your implementation? Is it appropriately polished, robust, and reliable?
Presentation - Are your web site and screencast clear, engaging, and effective? Your individual project score will also be influenced by your peer evaluations.
