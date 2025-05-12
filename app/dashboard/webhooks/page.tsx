"use client"

// Mock webhook data
const webhooks = [
  {
    id: "wh_1",
    event: "invoice.paid",
    url: "https://example.com/webhooks/invoice-paid",
    status: "success",
    statusCode: 200,
    responseTime: 120,
    timestamp: "2023-06-01T10:15:30Z",
    payload: {
      event: "invoice.paid",
      data: {
        invoiceId: "INV-001",
        customerId: "cus_1",
        amount: 499,
        status: "paid",
      },
    },
    response: {
      status: "success",
      message: "Webhook received",
    },
  },
  {
    id: "wh_2",
    event: "customer.created",
    url: "https://example.com/webhooks/customer-created",
    status: "success",
    statusCode: 200,
    responseTime: 95,\
    timestamp: "2023-
