# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

A streamlined approach to building visualization components. Tejas provides simple, atomic copmonents that combine to make any number of complex data-viz components. 

Tejas is written using React for composablity and reusability, so make sure you have webpack!

### How do I get set up? ###

It may be easier to download the code directly rather than cloning the repository. Placing the folder inside a project
is the only way to get Tejas for now.

### Important ###

The most important aspect of utilizing Tejas is that the components assume a specific structure for data objects passed in: 

Data must be formatted as follows: 
```javascript
{ "xValue": Some Value, "yValue": Some Value }
```

This may change in the future to simply default to xValue and yValue, allowing the user to supply x and y attribute keys.


### Usage ###

Tejas comes with a few basic components that are combined into more complicated visualizations. 

Typically, you'll want to begin by wrapping your component in the `<Container />` component supplied by Tejas. 

`<Container />` Will take care of automatically measuring and resizing components, and makes use of React's cloneElement to pass in the measured height and width down to 
child components. `<Container />` also accepts `marginRight` and `marginBottom` which it uses to dynamically adjust the viewBox on it's underlying `<svg>` tag.

```javascript
export const BarChart = props => 
    <Container height={ props.height } marginRight={ props.marginRight } marginBottom={ props.marginBottom } >      
      <YAxis
        data={ props.data }
        label={ props.yLabel }
        marginTop={ props.marginTop || 0 }
        marginLeft={ props.marginLeft || 0 } />

      <Bars
        data={ props.data }
        spacer={ props.barSpacer || 5 }
        barFill={ props.barFill }
        marginTop={ props.marginTop || 0 }
        marginLeft={ ( props.marginLeft + 10 ) || 0 } />

      <XLabels
        label={ props.xLabel }
        data={ props.data } 
        spacer={ props.barSpacer || 5 }
        marginTop={ props.marginTop || 0 }
        marginLeft={ props.marginLeft || 0 } />
      
    </Container>	    
```

In this example, `<YAxis />`, `<Bars />`, and `<XLabels />` are built using smaller Tejas components. 

This approach allows you to play with margins, transforms and implement your BarChart component API as you see fit.

Here's what using `<BarChart />` looks like in an application
```javascript
import BarChart from '<Your Module>'

<div>
	<BarChart
  		data={ contractBudgetData }
		height={ 250 }
		xLabel="Title"
		yLabel="Budget"
		marginLeft={ 85 }
		marginBottom={ 45 } />
</div>
```