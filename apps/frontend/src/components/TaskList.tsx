import React, { useState } from "react";
import { Button, List, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DeleteOutlined } from '@ant-design/icons';
import { TODO } from "@todo-list/model";
import ApiClient from '../clients/ApiClient';

interface IProps {
  list: TODO.TTODOList,
  loading: boolean;
  onDone: (todo: TODO.TTODO) => void
  onDelete: (todo: TODO.TTODO) => void
  setSelected: any
  selected: any
}

const TaskList: React.FC<IProps> = props => {

  const { list, loading, onDone, onDelete, setSelected, selected } = props;

  const handleChangeStatus = (task: TODO.TTODO) => async (e: CheckboxChangeEvent) => {
    const result = await ApiClient.toggleDone(task.id, e.target.checked);
    if (result.state) {
      onDone(result.data as TODO.TTODO);
    }
  };

  const handleDelete = (task: TODO.TTODO) => async () => {
    const result = await ApiClient.delete(task.id)
    if (result.state) {
      onDelete(task);
    }
  }

  const handleSelectedItem = (task: TODO.TTODO) => async (e: CheckboxChangeEvent) => {
    const changedIndex = selected.findIndex((item: String) => task.id === item);
    if (changedIndex > -1) {
      selected.splice(changedIndex, 1);
    } else {
      setSelected([...selected, task.id]);
    }
    onDone(task as TODO.TTODO);
  };

  return (
    <List
      className="task-list"
      loading={loading}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
        >
          <List.Item.Meta
            avatar={<Checkbox id={"id-item-task-checkbox"} onChange={handleSelectedItem(item)} />}
            title={
              <>
                <div className="item-list-title">
                  <span>Título:</span>
                  {item.title}
                </div>
              </>
            }
            description={
              <>
                <span>Descripción:</span>
                {item.description}
                <div className="item-list">
                  <span>Completada:</span>
                  <Checkbox id={"ant-checkbox-input"} checked={item.completed} onChange={handleChangeStatus(item)} />
                  <Button style={{ 'float': 'right' }} type="primary" icon={<DeleteOutlined rev={undefined} />} onClick={handleDelete(item)} />
                </div>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
