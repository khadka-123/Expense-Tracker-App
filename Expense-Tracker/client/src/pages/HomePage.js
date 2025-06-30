import React, { useState, useEffect,useCallback } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [display, setDisplay] = useState("table");
  const [editable, setEditable] = useState(null);

  //columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setisModalOpen(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              deleteHandler(record);
            }}
          />
        </div>
      ),
    },
  ];

   const getAllTransactions = useCallback(async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const response = await axios.get("/api/transactions/get-transaction", {
          params: {
            userId: user._id,
            frequency,
            selectedDate,
            type,
          },
        });

        setLoading(false);

        // Ensure we store only the transactions array
        if (response.data && Array.isArray(response.data)) {
          setAllTransactions(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setAllTransactions([]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Could not fetch transactions:", error);
        message.error("Could not fetch transactions");
        setAllTransactions([]);
      }
    },[frequency, selectedDate, type]);

  useEffect(() => {

    getAllTransactions();
  }, [getAllTransactions]);

  //delete Handler
  const deleteHandler = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted Successfully");
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Failed to delete transaction. Please try again.");
    }
  };

  //form submit handling
  const submitHandler = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userId: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setisModalOpen(false);
      setEditable(null);
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction. Please try again.");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters mt-3">
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom"> Custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="expenses">Expense</Select.Option>
            <Select.Option value="income">Income</Select.Option>
          </Select>
        </div>

        <div className="display-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              display === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setDisplay("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              display === "chart" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setDisplay("chart")}
          />
        </div>

        <div>
          <button
            className="btn btn-primary mt-3 mb-3"
            onClick={() => setisModalOpen(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="transaction-content">
        {display === "table" ? (
          <Table dataSource={allTransactions} columns={columns} />
        ) : (
          <Analytics allTransactions={allTransactions} />
        )}
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={isModalOpen}
        onCancel={() => setisModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={submitHandler}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expenses">Expenses</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="pocket money">Pocket Money</Select.Option>
              <Select.Option value="internship">Internship</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="string" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="string" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
