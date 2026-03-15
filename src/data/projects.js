import placeholderImage from "../assets/project-placeholder.svg";

export const PROJECTS = [
  {
    id: "anchor",
    title: "Anchor",
    image: "/anchor_portfolio_rect_v3.png",
    sections: [
      {
        id: "overview",
        label: "overview",
        body: "Anchor is a desktop application that monitors multimodal signals—including screen activity, camera input, device usage, and user-declared tasks—to determine whether a user remains on task. The system logs distraction events and generates behavioral analytics that allow users to quantitatively evaluate and improve their focus over time.",
      },
      {
        id: "links",
        label: "links",
        links: [
          {
            label:
              "github - original hackathon version (current product far more advanced, coming soon :)",
            href: "https://github.com/ezsinehan/calHacks2024-SAPPHIRE",
          },
        ],
      },
    ],
  },
  {
    id: "sinehan-llm",
    title: "Sinehan LLM",
    image: "/portfolio_llm_project_collage.png",
    sections: [
      {
        id: "overview",
        label: "overview",
        body: "Sinehan LLM is a FastAPI-based Retrieval-Augmented Generation (RAG) system that ingests structured markdown documents, performs structure-aware chunking and token-based segmentation, embeds each chunk using a local sentence-transformer model, and stores the resulting vectors in a Qdrant cloud vector database for semantic retrieval. At query time, the system performs similarity search over the embedded corpus and uses Google Gemini to generate grounded responses constrained to retrieved context, returning answers with deterministic chunk-level citations.",
      },
      {
        id: "rag",
        label: "rag info",
        body: "RAG architectures combine information retrieval systems with large language models so the model retrieves relevant documents from an external knowledge base before generating an answer, improving accuracy and grounding responses in real data.",
      },
      {
        id: "links",
        label: "links",
        links: [
          {
            label: "github (still improving will be hosted here soon :)",
            href: "https://github.com/ezsinehan/sinehan-llm",
          },
        ],
      },
    ],
  },
  {
    id: "slopsite",
    title: "Full-Stack Course Enrollment Management System",
    image: "/portfolio_architecture_collage_v7.png",
    link: "https://github.com/ezsinehan/slopsite",
  },
  {
    id: "lgameai",
    title: "TUI L-Game AI",
    image: "/portfolio_red_project.png",
    link: "https://github.com/ezsinehan/The-L-Game",
  },
  {
    id: "ai-two-cents",
    title: "Ai's Two Cents",
    image: "/project_portfolio_rect.png",
    sections: [
      {
        id: "overview",
        label: "overview",
        body: "AI’s Two Cents is a prototype system that analyzes audience emotional responses to a speaker’s presentation and compares them with the speech transcript to generate targeted feedback. The application processes emotion data collected through HumeAI’s API and uses a language model to synthesize recommendations that help speakers refine phrasing, pacing, and delivery based on how the audience reacted at specific moments.",
      },
      {
        id: "note",
        label: "note",
        body: "**The following description is the Devpost write-up I created during the hackathon.**",
      },
      {
        id: "inspiration",
        label: "inspiration",
        body: "At UC Merced, alongside an upper-classman student, I recently started helping with his open-source polling software which had placed a heavy focus on data, as it is the purpose of the poll, at a very granular scale, for instance, it may collect data checking if placing a poll choice in a different spot would influence which poll choice the user picked. When I first saw HumeAI, I realized the amount of data this could provide to a speaker if he had the emotional data of an audience.",
      },
      {
        id: "what-it-does",
        label: "what it does",
        body: "The software would compare the speaker's speech and the audience's emotional data collected by HumeAI, which would allow the speaker to receive feedback specific feedback on what they can change by processing the collected data using some other software, for this test example we use OpenAI's GPT model.",
      },
      {
        id: "how-i-built-it",
        label: "how i built it",
        body: "I built the test example, using a react frontend to present the sample data, a Python flask backend to connect to the APIs, parse the data, and send data to the frontend, using HumeAI's API to get the audience's emotional data, as well as using OpenAI GPT-3 to formulate specific recommendations to the user.",
      },
      {
        id: "challenges",
        label: "challenges we ran into",
        body: "Immediately off the bat, this being my first hackathon and the first time I've attempted to build something so on the spot like this, I lacked the understanding of the importance of planning. I spent the first whole day, trying different ways to reuse the code provided by HumeAI, as I originally wanted to create a real-time application that provided real-time recommendations to the presenter. After realizing that I wasn't going to be able to use the code provided by Hume, I finally decided to switch over to a post-action recommendation system, since I did not know how to implement a WebSocket as I only understood what even was on the second day. Now after spending the first day, wasting time due to improper planning, I waste the majority of the second day due to improper planning, I decided to start working on my project by implementing a file upload system to my front end which would take an mp4 file to analyze through the API. After spending a whopping three hours due to my lack of knowledge on how to save the file from the front end to the backend I refused to learn it and was looking for someone else who did the same thing, so I could just replicate them. After being unable to do that for three hours, I finally decided to learn enough flask to complete my task which took another 2 hours. After a total of 5 hours, I used Flask for the first time to send the mp4 file from the front end to the backend server, and then decided not the use the file uploader in the end since I later found out I was unable to send any bigger files through for some reason. Now that I had an mp4 file to work with, I needed to focus on implementing the HumeAI API to process the mp4 file to get data for the audience's emotions, which I knew I couldn't find someone online who was doing this, so I understood the spk to the best of my abilities and implemented it with not many hiccups. Now, that I had the data, so from here I had to parse through 3000+ lines of data and simply the data to a point where I pass through the gpt model which was easier than I expected with the help of online resources. Now that I had the simplified data which was a mere 50 lines, I manually added the sample speech to the data. This is another mistake I made, I rushed trying to get a working model, that I didn't get all the data I needed originally, this mistake is again related to improper planning alongside not understand how hard it would be to go back and do this. Then I implemented the OpenAI gpt API, sent the data, formulated a prompt, and got specific recommendations on what the speaker could change. Linked the data the GPT model presents to the front-end which took long again due to lack of flask knowledge. At this point, I realized I didn't have the time or energy to keep going, so I put the sample video, speech, top emotions, and recommendations all on the front end and fell asleep at my workstation. I was able to continue developing my love for computer science.",
      },
      {
        id: "accomplishments",
        label: "accomplishments that i'm proud of",
        body: "I had a group member who showed up late after hacking started and after the teammate mixer, which is fine but then he bailed on me since he found another group with three people. I ended up finding another person who also had no group but after only the first day, he quit on me since there was no clear end in sight and everything we did failed. I had to push myself to keep going and I had fun doing it. I preserved, there were times were I doubted myself rethinking whole career choices, but I know that even the greats had doubted their choices so I kept going and kept learning. I learned so much and my number one goal for coming to this hackathon was making a submission as I heard from my more experienced friend that many people don’t even submit.",
      },
      {
        id: "what-i-learned",
        label: "what i learned",
        body: "Planning, it is actually the most important step in the development process and will save you so much time by preventing doing unneeded things. Don’t postone tasks unless you absolutely have to, finish tasks thoroughly before moving on as it requires more work to come back and finish later than it does now, you might not end up coming back to it Work on Github and document process there as well for more accurate development experience and information of past code if needed Don’t replicate similar code in your project, use it to understand better what you need to do since replicating code for your use case will probably take the same amount of time if not more and give you better code along with better understanding.",
      },
      {
        id: "next",
        label: "what's next for ai's two cents",
        body: "Currently, I’ve only processed sample data of the audience and the speech transcribed, in a very non-catered way, I want to improve how the data is processed as well as process the data in a more specific way focusing on more important aspects, like specific emotions and emotions at specific frames or seconds, and have better way to group data than averages of all emotions individuality. I love HumeAI, and I want to take this project as far as I possible can and further.",
      },
      {
        id: "links",
        label: "links",
        links: [
          {
            label: "github",
            href: "https://github.com/ezsinehan/calHacks2023-Ais-Two-Cents",
          },
          {
            label: "devpost submission",
            href: "https://devpost.com/software/ai-s-two-cents",
          },
        ],
      },
    ],
  },
  {
    id: "studybox",
    title: "Studybox",
    image: "/studybox_diagonal_collage_fixed.png",
    link: "https://studybox.sinehan.dev",
  },
  {
    id: "kinova-leaf-grasping",
    title: "Autonomous Kinova Leaf Grasping System",
    image: "/portfolio_robot_project_layout4.png",
    link: "https://github.com/ezsinehan/kinova-leaf-grasping",
  },
];
