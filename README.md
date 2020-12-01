# Red State, Blue State, The United States of Covid

Like many people, my pre-election assumption was that the October wave of Covid cases would hurt Trumps re-election chances. I originally wanted to build a map showing that, but after seeing the election results that assumption no longer seems to be true.

As [Nate Cohn described](https://www.nytimes.com/2020/11/10/upshot/polls-what-went-wrong.html):
"Adding to the intrigue: There is no evidence that the president fared worse in coronavirus hot spots, contrary to the expectations of pundits or studies. Instead, Mr. Trump fared slightly better in places with high coronavirus cases than in places with lower coronavirus cases, controlling for demographics, based on the preliminary results by county so far. This is most obviously true in Wisconsin, one of the nation’s current hot spots and the battleground state where the polls underestimated Mr. Trump the most."

So instead of just scrapping this map idea, I still think it tells a story of how Red states came to take the pandemic more seriously and how Republican governers would later institute mask mandates albeit reluctantly. Most notably Iowa as detailed in the NYT [How Iowa’s Governor Went From Dismissing Mask Mandates to Ordering One Herself](https://www.nytimes.com/2020/11/18/us/coronavirus-mask-mandate-iowa-reynolds.html). You can see in the map that the month of September is just all red states.

I already knew the partisan flip in Covid severity was true thanks to others who had already performed similar analysis:

[NYT: As Covid Has Become a Red-State Problem, Too, Have Attitudes Changed?](https://www.nytimes.com/2020/07/30/upshot/coronavirus-republican-voting.html)
!['Jed Kolko'](https://pbs.twimg.com/media/EjlAZp8WsAALklU?format=jpg&name=small)
!['William H. Frey'](https://i0.wp.com/www.brookings.edu/wp-content/uploads/2020/10/20201008_Metro_COVIDSpread_Fig2.png?w=768&crop=0%2C0px%2C100%2C9999px&ssl=1)


I went about building this using Mapbox GL JS, [Lo Bénichou's Albers USA map style](https://blog.mapbox.com/mapping-the-us-elections-guide-to-albers-usa-projection-in-studio-45be6bafbd7e), and of course the [nyt covid state-level data](https://github.com/nytimes/covid-19-data).

After doing some data pre-processing using Python's Pandas library by aggregating the cases by month, and merging it with Census state-level population estimates along with 2016 election results to indicate red state or blue state, I was able to begin mapping.

Following Lo Bénichou's guide on [Feature State API](https://blog.mapbox.com/mapping-the-us-elections-the-2020-edition-guide-to-feature-state-7f4f6f94eaf9) I was able to data join with the Albers USA map. However I quickly ran into a problem, which was that I wanted to build a filter to add to my time slider. The problem was according to Mapbox's style specification "The feature-state expression is not supported in filter expressions." :(

Well good news is I quickly(3 hours later) figured out a hacky workaround. I added a global variable that tracked the current month and filtered the data using a conditional BEFORE setting the feature state. And after each user input on the time slider, the map would remove the previous feature state and then set a new one with the new month. Voila 👨‍🍳 😘 it worked!

All in all I think this was a good experience building the map and playing around with covid data. I think some ideas for next time are maybe using more granular data like county or 7-day moving average, instead of state and month.


* One last note if you are trying to use the [Mapbox Albers USA map style](https://www.mapbox.com/elections/albers-usa-projection-style), I think there's a small typo in the albersusa tileset table of properties for type "state". I think it should be "state_name" instead of just "name" like in the county type. I initially wasn't able to join by priority-id until I figured out this bug. 
