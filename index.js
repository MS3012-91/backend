// const http = require("http");
// const app = require("./app");

// const PORT = process.env.PORT || 5000;
// const HOST = process.env.HOST || "127.0.0.1";

// const server = http.createServer(app);

// server.listen(PORT, HOST, () =>
//   console.log(`Server is listening on ${PORT}, ${HOST}`)
// );

const { ClassRoom, Topic } = require("./db/models");
const topic = require("./db/models/topic");
(async function () {
  try {
    // const newClass1 = { title: "JS2023-1" };
    //   const createdClass1 = ClassRoom.create(newClass1);
      
    //   const newClass2 = { title: "JS2023-2" };
    //   const createdClass2 = ClassRoom.create(newClass2);

    //   const newTopic1 = { caption: "Hello", classId: 1 };
    //   const createdTopic1 = Topic.create(newTopic1);
    //   const newTopic2 = { caption: "Hello2", classId: 1 };
      //   const createdTopic2 = Topic.create(newTopic2);
      
    //   const classesWithTopics = await ClassRoom.findAll({ include: Topic, raw:true });
    //   const topiscWitchClasses = await Topic.findAll({ include: ClassRoom, raw: true });
      //   console.log("topiscWitchClasses", topiscWitchClasses);
      
      //Lazy Loading (only when have associations)
      const class2 = await ClassRoom.findByPk(2);
      const topicsoOfClass2 = await class2.getTopics({raw:true});
      console.log("topicsoOfClass2", topicsoOfClass2);
//classes of topic
      const topic1 = await Topic.findByPk(1);
      const classesOfTopic = await topic1.getClassRoom({ raw: true });
      console.log("classesOfTopic", classesOfTopic);
  } catch (err) {
    console.log("err", err);
  }
})();
