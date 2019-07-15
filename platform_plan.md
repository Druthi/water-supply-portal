## Water Supply Portal 

### Objective
Open source platform to show the failure in supplying water to the residents of Ward 117 of Shanthi Nagar, Bangalore. Analyses the effects of the failure of BWSSB on the health of the residents, as well as increase in total cost of the residents and BWSSB in mitigating the issue.

### Source of Data
Data is collected by the Shanthi Nagar Residents Welfare Association (SRWA) from the residents of Ward 117 for the month of June 2019 to July 2019.

### Technologies used
* Front end - React, D3, Styled Components
* Server - Node, Express
* Database – PostgreSQL

## Platform architecture

### Section I – BWSSB
Platform includes a page describing the
* duties of BWSSB in supplying water
* the budget allocated for the same
* process to file a complaint by the resident in the event of failure

This information can give the residents an idea of their rights as citizens. Informing citizens not only increase their civic awareness but also give them lot more power and weight when they lodge complaints. A large majority do not lodge complaints because of their lack of knowledge and access to information that is easily available and readable.

### Section II - Parameter wise analysis
Platform has data visualization to analyze the data collected by SRWA in the form of a bar graph that displays the number of connections that fall under each parameter. The four parameters are -
1.	No supply - No supply of water
2.	Contaminated - There is water supply, but water is contaminated
3.	Low pressure - There is water supply however with very low pressure
4.	Drainage Issue - Drainage is not properly maintained leading to contamination of water

### Features
1. On hovering over each area of the bar chart, an aggregate number of connections is displayed for each parameter.
2. User can filter the data based on the street name chosen. User can select multiple streets in the filter.
3. User can filter based on time period and multiple time periods can be selected. (In this case, the Y axis would show not only the 4 parameters, but the four parameters for every time period.)
4. A parameter filter to show data wrt a particular parameter over a period of time.
5. User can download csv file of the data including the following fields
  * Street name
  * House number
  * Water supply
  * Pressure
  * Contaminated
  * Drainage Issue


### Target Audience
 Open source. Accessible by anyone.

### Use Cases

1.	Residents of Shanthi Nagar can have easy access to the data which is also readable and comprehensible thereby helping them understand the reality of the water supply. Make them better informed citizens and gives them factual data when they have to lodge a complaint.
2.	BWWSB can access this data to understand-
  * areas not getting water, 
  * areas getting low pressure water,
  * areas that need attention to proper drainage maintenance,
  * areas that are receiving contaminated water.
This data can help the BWSSB take proper actions to mitigate the problem in a more efficient and faster manner, saving resources in having to check every part of the water connection. The street wise filter can help them understand where the pipeline needs attending. For example, Chowdappa Road has 16 out of 20 connections with low pressure supply while having 0 connections with water contamination. Therefore, this would mean that BWSSB needs to check the lines on Chowdappa Road, only for the issue of low pressure.

_**Cost Analysis**_
The data above can be used to understand the increase in cost to BWSSB due to the not supplying water to the residents of Shanthi Nagar.

This data can help understand -
1.	Increase in cost to the government in supplying clean water through tankers,
2.	Increase in the cost for the residents due to buying clean water.

_**Health Analysis**_
With the above data and the data collected from residents about their health status, a co-relation can be drawn between the areas receiving contaminated water and the health of the residents in the said area during the same time period. If the number of sick residents in the contaminated zones are high, a co-relation can be made that it could be due to the contaminated water.

The medical cost can be added to the cost analysis and a conclusion can be drawn as to the total cost increase to residents of Shanthi Nagar due to no supply of water and supply of contaminated water.

A time series analysis can be made between the contamination parameter and the increase in sickness parameter. This can be used to analyze trends to see if there is a co-relation between the two over a period of time.

### Bottlenecks

1.	Data collection by RWA’s (done quarterly or yearly) consistently to update data to the platform.
2.	Source of medical records of the residents can be through door to door collection from the residents. An app can be created, or the platform could have a tool that helps users submit data which can be used for the analysis. It can also be collected from hospitals in and around Shanthi Nagar (depending on confidentiality and privacy laws) to understand the number of patients at a given time from Shanthi Nagar.

**Note: _Area scope can transcend beyond just Shanthi Nagar and this can be replicated in every Ward in Bangalore. This can help with doing more analysis to see which areas are being neglected by BWSSB and its effects on the welfare of the people (health and social)._**

