import * as React from "react";
import * as ReactDOM from "react-dom";
import { LayoutDemo } from '../example/NormalLayout/index';
import { SortedTableWithStatic } from "../example/StaticWidget/index";
import { LayoutRestore } from "../example/LayoutRestore/index";
import { HandleLayout } from "../example/HandleLayout/index";
import { AddRemove } from "../example/AddRemove/index";
import { HistoryDemo } from "../example/HistoryLayout/index";
import { Mobile } from "../example/mobileLayout/index";
import './index.css'
// import { Dragact } from "./lib/dragact";



const DemoMap: any = {
    normalLayout: <LayoutDemo />,
    // SortedTable: <SortedTable />,
    StaticHeader: <SortedTableWithStatic />,
    LayoutRestore: <LayoutRestore />,
    HandleLayout: <HandleLayout />,
    AddRemove: <AddRemove />,
    Mobile: <Mobile />,
    HistoryLayout: <HistoryDemo />
}

class DemoDispatcher extends React.Component<{}, {}> {

    state = {
        demo: <LayoutDemo />
    }

    handleLayoutChange = (demoName: string) => {
        this.setState({
            demo: DemoMap[demoName]
        })
    }

    render() {
        return (
            <div>
                <iframe src="https://ghbtns.com/github-btn.html?user=215566435&repo=Dragact&type=star&count=true&size=large"
                    frameBorder='0' scrolling="0" width="160px" height="30px"></iframe>
                <iframe src="https://ghbtns.com/github-btn.html?user=215566435&repo=Dragact&type=fork&count=true&size=large"
                    frameBorder="0" scrolling="0" width="158px" height="30px"></iframe>
                <div>切换 Demos</div>
                <div className='demo-button-layout'>
                    <button onClick={() => this.handleLayoutChange('normalLayout')}>Ordinary layout</button>
                    <button onClick={() => this.handleLayoutChange('StaticHeader')}>Static component</button>
                    <button onClick={() => this.handleLayoutChange('LayoutRestore')}>Storage layout</button>
                    <button onClick={() => this.handleLayoutChange('HistoryLayout')}>Memory operation layout</button>
                    <button onClick={() => this.handleLayoutChange('HandleLayout')}>Drag handle</button>
                    <button onClick={() => this.handleLayoutChange('AddRemove')}>Add and delete</button>
                    <button onClick={() => this.handleLayoutChange('Mobile')}>Mobile end</button>
                </div>
                {this.state.demo}
            </div>
        )
    }
}

{/* <DemoDispatcher /> */ }

//<Dragact/> */}

// const fakeData = [
//     { GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
//     { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
//     { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
// ]

// const getblockStyle = (isDragging: Boolean) => {
//     return {
//         background: isDragging ? '#1890ff' : 'white',
//     }
// };

// const Handle = ({ provided }: any) => {
//     return (
//         <div
//             {...provided.dragHandle}
//             style={{
//                 ...getblockStyle(provided.isDragging),
//                 borderBottom: '1px solid rgba(120,120,120,0.3)',
//                 textAlign: 'center'
//             }}
//         >
//             Click to drag
//         </div>
//     )
// }

// ReactDOM.render(
//     <Dragact
//         layout={fakeData}//Required field
//         col={16}//Required field
//         width={800}//Required field
//         rowHeight={40}//Required field
//         margin={[5, 5]}//Required field
//         className='plant-layout'//Required field
//         style={{ background: '#333' }}//non-Required field
//         placeholder={true}//non-Required field
//     >
//         {(item: any, provided: any) => {
//             return (
//                 <div
//                     {...provided.props}
//                     style={{ ...provided.props.style, background: 'white' }}
//                 >
//                     <Handle provided={provided} />
//                     {provided.isDragging ? 'Crawling' : 'park'}
//                 </div>
//             )
//         }}
//     </Dragact>,
//     document.getElementById('root')
// );



ReactDOM.render(
    <DemoDispatcher />,
    document.getElementById('root')
);


document.addEventListener('touchmove', function (e) { e.preventDefault() }, false);