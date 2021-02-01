const {Kafka}=require('kafkajs')
const Chance=require('chance')

const chance=Chance()

//2
const kafka=new Kafka({
    clientId:'rams-producer',
    brokers:['localhost:9092','localhost:9093','localhost:9094']
})

//3
const producer=kafka.producer()

//5
const newTopic=async()=>{
    let value=chance.profession()
    await producer.send({
        topic:'profession',
        messages:[
            {value:value}
        ]
    })
}

//Our own static topic called districts will be created and a dynamic topic called profession will also be created and profession topics is pushed with messages for every send with a new profession taken from the chance package of npm.
//4
const execute=async()=>{
    await producer.connect()
    await producer.send({
        topic:'districts',
        messages:[
            {value:'Srikakulam'},
            {value:'Vizianagaram'},
            {value:'Visakhapatnam'},
            {value:'East Godavari'},
            {value:'West Godavari'},
            {value:'Krishna'},
            {value:'Guntur'},
            {value:'Prakasam'},
            {value:'Nellore'}
        ]
        
    })
    setInterval(newTopic,1000)
}
//6
execute().catch(console.error)