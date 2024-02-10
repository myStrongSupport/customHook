import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../Hooks/useHttp";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTask } = useHttp();

  const onCreateTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    console.log(taskText);
    sendTask(
      {
        url: "https://usehook-73f10-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      onCreateTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
