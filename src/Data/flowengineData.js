export default class FlowEngineData { }
FlowEngineData.RULES = [
    {
        id: 1, body: function (a,b) {
           return a!==b;
        },
        title:'Check Not Equal Number',
        true_id: 10,
        false_id: 11
    },
    {
        id: 2, body: function (a,b) {
           return a==b;
        },
        title:'Check Equal Number',
        true_id: 12,
        false_id: 13
    }
]

FlowEngineData.INCOMINGDATA = [
    { id: 1, data: [1, 2] },
    { id: 2, data: [2, 2] }
]