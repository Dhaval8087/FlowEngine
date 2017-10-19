import React, { Component } from 'react'
import FlowEngineData from '../Data/flowengineData';
import { PanelGroup, Panel } from 'react-bootstrap';
import './index.css';
var finalOutput = [];
class flowengine extends Component {

    constructor(props) {
        super(props)
        this.handleflow = this.handleflow.bind(this);
    }
    /**
     * Find the Incomming Data from the passed id
     * @param {*Number} id 
     * @return {Array} final array
     */
    findIncommingData(id) {
        var findObj;
        FlowEngineData.INCOMINGDATA.map(find => {
            if (find.id === id)
                findObj = find;
        })
        return findObj;
    }
    /**
     * handle the rule execution.
     */
    handleflow() {

        var flowData = JSON.parse(JSON.stringify(FlowEngineData.RULES));
        FlowEngineData.RULES.map(item => {

            let getArgument = this.findIncommingData(item.id);

            var obj = new Object(item);
            let result = obj.body(getArgument.data.join())
            finalOutput.push({ "result": result, "item": obj });
        });
        return finalOutput;
    }
    /**
     * render the UI 
     */
    render() {
        var executedData = this.handleflow();

        return (
            <div>
                <PanelGroup defaultActiveKey="1" accordion>
                    {typeof executedData != "undefined" ?
                        executedData.map(data => {
                            var panelColotstyle = data.result === true ? "success" : "danger";
                            return (
                                <Panel header={data.item.title} eventKey={data.item.id} bsStyle={panelColotstyle} className="gray-bg">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span className="textcolor">Rule body</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="bodycontent">
                                                <span className="bodyspan">
                                                    {data.item.body.toString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span className="textcolor">Next rule-id if passed</span>
                                        </div>
                                        <div className="col-md-3">
                                            <span className="textcolor">Next rule-id if failed</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="bodycontent">
                                                <span className="bodyspan">{data.item.true_id}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="bodycontent">
                                                <span className="bodyspan">{data.item.false_id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Panel>
                            )
                        }) : null
                    }
                </PanelGroup>
            </div>
        )
    }
}

export default flowengine