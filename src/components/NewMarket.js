import React, { useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { createMarket } from '../graphql/mutations';
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'

const NewMarket = ({marketDialogVisible, setMarketDialogVisible}) => {
  const [input, setInput] = useState("");
  
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const result = await API.graphql(graphqlOperation(createMarket, {input}));

      setInput("");
      setMarketDialogVisible(false);
  
      console.log('Return result', result);
    } catch(error) {
      Notification.error({
        title: 'error',
        message: `${error.message || "Something is wrong, please try again"}`
      });
    } 
  }

  return (
    <>
      <div className="market-header">
          <h1 className="market-title"> Create Your Market Place <Button type="text" icon="edit" className="market-title-button" onClick={setMarketDialogVisible} /> </h1>
      </div>
      <Dialog  size="large" customClass="dialog" title="Create New Market" visible={marketDialogVisible} onCancel={() => setMarketDialogVisible(false)}> 
      <Dialog.Body>
        <Form labelPosition="top">
          <Form.Item label="Add Market Name">
            <Input placeholder="Market Name" trim={true} onChange={(dataInput) => setInput(dataInput)} value={input} />
          </Form.Item>
        </Form>
      </Dialog.Body>
      <Dialog.Footer>
          <Button onClick={() => setMarketDialogVisible(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={(e) => onSubmitForm(e)} disabled={!input.length}>
            Add
          </Button>
      </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default NewMarket;
