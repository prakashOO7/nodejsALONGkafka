const {Kafka}=require('kafkajs')

const kafka=new Kafka({
    clientId:'rams-consumer',
    brokers:['localhost:9092','localhost:9093','localhost:9094']
})

const consumer=kafka.consumer({groupId:'consumer-group'})

const execute=async()=>{
    await consumer.connect()
    //need to subscribe to the topic for receiving messages
    await consumer.subscribe({topic:'districts',fromBeginning:true})
    await consumer.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(
                {
                    partition,
                    offset:message.offset,
                    value:message.value.toString()
                }
            )
        }

    })
}

execute().catch(console.error)