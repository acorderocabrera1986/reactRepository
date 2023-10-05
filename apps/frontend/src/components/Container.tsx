import React, { useState, useEffect } from "react";
import { TODO } from "@todo-list/model";
import { Button, Space, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import TaskList from "./TaskList";
import FormTodo from "./FormTodo";
import ApiClient from "../clients/ApiClient";

const Container: React.FC = () => {

  const [list, setList] = useState<TODO.TTODO[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const changeSelected = (id: string) => {
    const currentSelected = [...selected]
    const selectedIndex = selected.indexOf(id);
  }

  const onListTask = async () => {
    setLoading(true)
    const result = await ApiClient.list()
    if (result.state) {
      const { data = [] } = result;
      setList(data as TODO.TTODOList);
      // buscar los item marcados como completados y adicionarlo a los selected
      const selectedItem = [];
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        if (item.completed) {
          selectedItem.push(item.id);
        }
      }
    }
    setLoading(false)
  };

  useEffect(() => {
    onListTask();
  }, []);

  const handleAddItem = (addItem: TODO.TTODO) => {
    setList([addItem, ...list]);
  };

  const handleDone = (item: TODO.TTODO) => {
    const currentList = [...list]
    const changedIndex = currentList.findIndex((task: TODO.TTODO) => task.id === item.id);
    if (changedIndex > -1) {
      currentList[changedIndex] = item;
      setList(currentList);
      changeSelected(item.id)
    }
  }

  const handleDelete = (item: TODO.TTODO) => {
    const currentList = [...list]
    const changedIndex = currentList.findIndex((task: TODO.TTODO) => task.id === item.id);
    if (changedIndex > -1) {
      currentList.splice(changedIndex, 1);
      setList(currentList);
      changeSelected(item.id)
    }
  }

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteAll = async () => {
    const currentList = [...list];
    const result = await ApiClient.removeAll(selected);
    if (result.state) {
      for (let index = 0; index < selected.length; index++) {
        const id = selected[index];
        const changedIndex = currentList.findIndex((task: TODO.TTODO) => task.id === id);
        if (changedIndex > -1) {
          currentList.splice(changedIndex, 1);
        }
      }
      setList(currentList);
      setSelected([]);
    }
  }

  return (
    <div className="list-container">
      <div className="list-container-header-h2"><h1>Gestionar tareas</h1></div>
      <div className="list-container-header">
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined rev={undefined} />}
            onClick={handleToggleModal}
            id={'ant-button-add'}
          />
          <Button
            type="primary"
            icon={<DeleteOutlined rev={undefined} />}
            disabled={selected.length === 0}
            onClick={handleDeleteAll}
            id={"id-delete-all-button"}
          />
        </Space>
      </div>
      <Divider />
      <TaskList
        list={list}
        loading={loading}
        onDone={handleDone}
        onDelete={handleDelete}
        setSelected={setSelected}
        selected={selected}
      />
      {isModalOpen && (
        <FormTodo handleAddItem={handleAddItem} onClose={handleToggleModal} isOpen={isModalOpen} />
      )}
    </div>
  );
};

export default Container;
