import React, { useState } from "react";
import { Button, Form, Input, Modal, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { TODO } from '@todo-list/model'
import ApiClient from "../clients/ApiClient";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const SubmitButton = ({ form }: { form: FormInstance }) => {
  
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

interface IProps {
  handleAddItem: (message: TODO.TTODO) => void;
  onClose: () => void;
  isOpen: boolean;
}

const FormTodo: React.FC<IProps> = props => {
  const { handleAddItem, onClose, isOpen } = props;
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();

  const onCreate = async () => {
    const values: TODO.TTODO = formRef.current?.getFieldsValue()
    const result = await ApiClient.add(values)
    if (result.state) {
      handleAddItem(result.data as TODO.TTODO);
      formRef.current?.resetFields();
      onClose();
    }
  };

  return (
    <Modal footer={null} title="Adicionar tarea" open={isOpen} onCancel={onClose} onOk={onCreate}>
      <Form
        {...layout}
        form={form}
        layout="vertical"
        ref={formRef}
        name="validateOnly"
        onFinish={onCreate}
        autoComplete="off"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="title" label="Título" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Descripción" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Space>
          <SubmitButton form={form}/>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default FormTodo;
