# Dragact 👋

[![npm version](https://img.shields.io/npm/v/dragact.svg)](https://www.npmjs.com/package/dragact) [![npm downloads](https://img.shields.io/npm/dm/dragact.svg)](https://www.npmjs.com/package/dragact)

Dragact is a React component that allows you to easily and quickly build a powerful ** drag-and-drop grid layout**.

![](https://github.com/215566435/Dragact/blob/master/static/image/dashboard.gif?raw=true)

# Demo Site

[Live Demo(Preview address)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-layout/blob/master/build/index.html)

# Features

- [x] Automatic layout of the grid system
- [x] can also be operated on the phone
- [x] Highly adaptive
- [x] static component
- [x] drag component
- [x] auto-scaling component
- [x] Custom drag handle
- [x] Custom Zoom Handle
- [x] responsive layout

<br/>

# Quick start

```bash
npm install --save dragact
```

### The simplest example 🌰

```javascript
//index.js
import React from 'react'
import ReactDOM from 'react-dom'

import { Dragact } from 'dragact'

const fakeData = [
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
]

const getblockStyle = isDragging => {
    return {
        background: isDragging ? '#1890ff' : 'white'
    }
}

ReactDOM.render(
    <Dragact
        layout={fakeData} //Required field
        col={16} //Required field
        width={800} //Required field
        rowHeight={40} //Required field
        margin={[5, 5]} //Required field
        className="plant-layout" //Required field
        style={{ background: '#333' }} //non-Required field
        placeholder={true}
    >
        {(item, provided) => {
            return (
                <div
                    {...provided.props}
                    {...provided.dragHandle}
                    style={{
                        ...provided.props.style,
                        ...getblockStyle(provided.isDragging)
                    }}
                >
                    {provided.isDragging ? 'Grabbing' : 'park'}
                </div>
            )
        }}
    </Dragact>,
    document.getElementById('root')
)
```

# Component design philosophy

### 1.Dependent injection pendant(widget)

As you can see from the simplest example, the way we render subcomponents is a bit different. In the past, the React component was written in a similar way to the following:

```jsx
    <Dragact
        col={8}
        width={800}
        margin={[5, 5]}
        rowHeight={40}
        className='plant-layout'
    >
        <div key={0} data-set={{ GridX: 0, GridY: 0, w: 4, h: 2 }} className='layout-child'>0</div>
        <div key={1} data-set={{ GridX: 0, GridY: 0, w: 1, h: 2 }} className='layout-child'>1</div>
        <div key={2} data-set={{ GridX: 0, GridY: 0, w: 3, h: 2 }} className='layout-child'>2</div>
    </Dragact>,
```

This can be done of course, but there are a few questions:

- Subcomponents are very ugly, we need to define a lot of things
- It's hard to listen to subcomponent events, such as drag and drop, etc.
- If there is a large amount of data, you must write a map function on the array, similar to: `layout.map(item=>item);` to help render the array

To solve this problem, I highly abstract the rendering of the subcomponent into a **constructor**, which is simply the following form:

```jsx
    <Dragact
        layout={fakeData}//Required field
        {...something}
    >
        {(item, provided) => {
            return (
                <div
                    {...provided.props}
                    {...provided.dragHandle}
                    style={{
                        ...provided.props.style,
                        ...getblockStyle(provided.isDragging)
                    }}
                >
                    {provided.isDragging ? 'Grabbing' : 'park'}
                </div>
            )
        }}
    </Dragact>,
```

Now, our child element rendering becomes a small ** constructor**, the first input parameter is each item of your input data, and the second parameter is **provided**, which provides all the drag and drop. Attributes.

This is done easily, reducing the component hierarchy, the components are beautiful, you don't have to write the map function, you don't have to write the key, and it's easier to listen to the drag state of each component **provided.isDragging**.

For more reliance on injection ideas and benefits, please see my knowledge and answer: [Know, Founder's answer: how to design a component library] (https://www.zhihu.com/question/266745124/answer/322998960 )

### 2. Smooth component sliding

In order to ensure the comfort of dragging, I implemented the element's translate(x,y), and with CSS animation, the movement of each step is so smooth.

You can easily see where each component slips and where it is located.

### 3.Data Driven Mode

> View changes are data changes

This is a revelation from React. The Dragact component achieves data changes, ie view changes, by processing the data.

The advantage of this is that we can easily record the layout information in the server's database**, the next time you get the data, you can easily restore the original view location**.

By getting an instance of the dragact component, I provide an api `getLayout():DragactLayout;` to get the current **layout information**.

### 4. Sliding center

After constant efforts and attempts, all widget movements now rely on the gravity center to move.

This means that when we drag a widget, it's more handy and natural.

See what the `dragact` is before optimization.

![A very long block that has been dragged beyond the screen to exchange blocks] (https://pic2.zhimg.com/v2-9180ee016a4d01834565de5c126263c1_b.gif)

Let’s look at the experience of `dragact` after optimization.

![When the center of the long square bar exceeds the center of the square below, it will move] (https://pic3.zhimg.com/v2-0f6ac6fe7b7980ad07b9af78625fca4d_b.gif)

Such an optimization brings about the difference in drag feel. The purpose of dragging the block down is largely because I want to swap the position with a block below.

Through this trend of judgment and a large number of experiments, `dragact` chose the center of gravity as the moving point, which is more natural and feels smoother.

### 5. Excellent performance

Let's watch performance with intuitive animations!

![](https://pic3.zhimg.com/v2-3a9a1c2894ccbf4bbf791b9aa82912b2_b.gif)

This is a large amount of data over 300 lines. Before optimization, we can see that there will be obvious stuck.

![](https://pic3.zhimg.com/v2-4d11298ef72730d686172a149f1f135d_b.gif)

After using the optimization of the react component, it is still a large amount of data of more than 300 lines.

A noticeable change in the insertion speed of the component can be seen.

# Dragact Provided properties

### Data Attributes

Data attributes refer to the attributes owned by each of our components, a set of data similar to the following

```ts
const layout = [
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
]

GridX: number //Required, the abscissa in the layout of the pendant
GridY: number //Required, ordinate in the layout of the pendant
w: number //required, width in the layout of the pendant, integer
h: number //required, height in the layout of the pendant, integer
Key: number | string //Required, the unique id of the pendant in the layout
```


### Component Attributes
```ts
export interface DragactProps {
    layout: DragactLayoutItem[]
    /**
     * Width division ratio
     * This parameter will divide the width of the container into col equal parts.
     * Then the minimum width of the elements in the container is equal to containerWidth / col
    */
    Col: number,

    /**
     * The width of the container
    */
    Width: number,

    /**The minimum height of each element in the container */
    rowHeight: number,

    /**
     * padding inside the container
     */
    padding?: number,

    children: (Item: DragactLayoutItem, provided: GridItemProvided) => any,


//
    // interface GridItemEvent {
    // event: any //browser drag event
    // GridX: number //x grid in the layout
    // GridY: number // y grid in the layout
    // w: number // the width of the element
    // h: number //the height of the element
    // UniqueKey: string | number // the unique key of the element
    // }

    /**
     * Drag the start of the callback
     */
    onDragStart?: (event: GridItemEvent) => void

    /**
     * Drag in the drag
     */
    onDrag?: (event: GridItemEvent) => void

    /**
     * Drag the end of the callback
     */
    onDragEnd?: (event: GridItemEvent) => void

    /**
     * The margin of each element, the first parameter is left and right, the second parameter is up and down
     */
    margin: [number, number]

    /**
     * Layout name
    */
    className: number | string

    /** Is there a placeholder */
    placeholder?: Boolean

    style?: React.CSSProperties

}

```
# Ref Api

Get the ref of the component, you can use its api

```ts
/*
Returns the current layout.
*/
getLayout():DragactLayout;
```

# 测试

```bash
git clone https://github.com/215566435/Dragact.git
cd Dragact
npm install
npm run test
```
# Contribution

### Want a new feature, function?

1. If you want to add some new features or some great ideas, please send an issue to tell me, thank you!
2. If you have already read the source code and added some very good ideas, please start your PR.

### Have a bug?

If you find a bug in this project, please let me know immediately. Add an issue and help give the most simple and reproducible example, which will allow me to quickly locate the bug to help you solve it, thank you!

# LICENSE

MIT
````
