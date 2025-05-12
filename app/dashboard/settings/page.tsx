"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "SaaS Analytics Inc.",
    supportEmail: "support@saasanalytics.com",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  })

  const [billingSettings, setBillingSettings] = useState({
    stripePublicKey: "pk_test_1234567890",
    stripeSecretKey: "sk_test_1234567890",
    invoicePrefix: "INV-",
    trialPeriod: "14",
    sendInvoiceReminders: true,
    automaticPaymentCollection: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    sendWelcomeEmail: true,
    sendInvoiceEmails: true,
    sendPaymentReminders: true,
    sendUsageAlerts: true,
    emailFooter: "© 2023 SaaS Analytics Inc. All rights reserved.",
  })

  const [webhookSettings, setWebhookSettings] = useState({
    signatureSecret: "whsec_1234567890",
    retryFailedWebhooks: true,
    maxRetries: "3",
    retryInterval: "60",
  })

  const handleSaveGeneral = () => {
    // In a real app, this would send the data to the server
    console.log("Saving general settings:", generalSettings)
    toast({
      title: "Settings saved",
      description: "Your general settings have been saved successfully.",
    })
  }

  const handleSaveBilling = () => {
    // In a real app, this would send the data to the server
    console.log("Saving billing settings:", billingSettings)
    toast({
      title: "Settings saved",
      description: "Your billing settings have been saved successfully.",
    })
  }

  const handleSaveEmail = () => {
    // In a real app, this would send the data to the server
    console.log("Saving email settings:", emailSettings)
    toast({
      title: "Settings saved",
      description: "Your email settings have been saved successfully.",
    })
  }

  const handleSaveWebhook = () => {
    // In a real app, this would send the data to the server
    console.log("Saving webhook settings:", webhookSettings)
    toast({
      title: "Settings saved",
      description: "Your webhook settings have been saved successfully.",
    })
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your company information and general preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={generalSettings.companyName}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input
                      id="support-email"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          supportEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select
                      value={generalSettings.dateFormat}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          dateFormat: value,
                        })
                      }
                    >
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>Configure your payment processor and billing preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-public-key">Stripe Public Key</Label>
                    <Input
                      id="stripe-public-key"
                      value={billingSettings.stripePublicKey}
                      onChange={(e) =>
                        setBillingSettings({
                          ...billingSettings,
                          stripePublicKey: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                    <Input
                      id="stripe-secret-key"
                      type="password"
                      value={billingSettings.stripeSecretKey}
                      onChange={(e) =>
                        setBillingSettings({
                          ...billingSettings,
                          stripeSecretKey: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                    <Input
                      id="invoice-prefix"
                      value={billingSettings.invoicePrefix}
                      onChange={(e) =>
                        setBillingSettings({
                          ...billingSettings,
                          invoicePrefix: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trial-period">Trial Period (days)</Label>
                    <Input
                      id="trial-period"
                      type="number"
                      value={billingSettings.trialPeriod}
                      onChange={(e) =>
                        setBillingSettings({
                          ...billingSettings,
                          trialPeriod: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="invoice-reminders">Send Invoice Reminders</Label>
                      <div className="text-sm text-muted-foreground">
                        Send email reminders for upcoming and overdue invoices.
                      </div>
                    </div>
                    <Switch
                      id="invoice-reminders"
                      checked={billingSettings.sendInvoiceReminders}
                      onCheckedChange={(checked) =>
                        setBillingSettings({
                          ...billingSettings,
                          sendInvoiceReminders: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="automatic-payment">Automatic Payment Collection</Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically charge customers when invoices are due.
                      </div>
                    </div>
                    <Switch
                      id="automatic-payment"
                      checked={billingSettings.automaticPaymentCollection}
                      onCheckedChange={(checked) =>
                        setBillingSettings({
                          ...billingSettings,
                          automaticPaymentCollection: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveBilling}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure your email notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="welcome-email">Welcome Email</Label>
                      <div className="text-sm text-muted-foreground">Send a welcome email to new customers.</div>
                    </div>
                    <Switch
                      id="welcome-email"
                      checked={emailSettings.sendWelcomeEmail}
                      onCheckedChange={(checked) =>
                        setEmailSettings({
                          ...emailSettings,
                          sendWelcomeEmail: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="invoice-emails">Invoice Emails</Label>
                      <div className="text-sm text-muted-foreground">
                        Send emails when invoices are created or paid.
                      </div>
                    </div>
                    <Switch
                      id="invoice-emails"
                      checked={emailSettings.sendInvoiceEmails}
                      onCheckedChange={(checked) =>
                        setEmailSettings({
                          ...emailSettings,
                          sendInvoiceEmails: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-reminders">Payment Reminders</Label>
                      <div className="text-sm text-muted-foreground">
                        Send reminders for upcoming and overdue payments.
                      </div>
                    </div>
                    <Switch
                      id="payment-reminders"
                      checked={emailSettings.sendPaymentReminders}
                      onCheckedChange={(checked) =>
                        setEmailSettings({
                          ...emailSettings,
                          sendPaymentReminders: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="usage-alerts">Usage Alerts</Label>
                      <div className="text-sm text-muted-foreground">
                        Send alerts when customers approach usage limits.
                      </div>
                    </div>
                    <Switch
                      id="usage-alerts"
                      checked={emailSettings.sendUsageAlerts}
                      onCheckedChange={(checked) =>
                        setEmailSettings({
                          ...emailSettings,
                          sendUsageAlerts: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <Label htmlFor="email-footer">Email Footer</Label>
                  <Textarea
                    id="email-footer"
                    value={emailSettings.emailFooter}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        emailFooter: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveEmail}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Settings</CardTitle>
                <CardDescription>Configure your webhook delivery preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signature-secret">Signature Secret</Label>
                  <Input
                    id="signature-secret"
                    type="password"
                    value={webhookSettings.signatureSecret}
                    onChange={(e) =>
                      setWebhookSettings({
                        ...webhookSettings,
                        signatureSecret: e.target.value,
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    This secret is used to sign webhook payloads for verification.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="retry-webhooks">Retry Failed Webhooks</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically retry webhook delivery when it fails.
                    </div>
                  </div>
                  <Switch
                    id="retry-webhooks"
                    checked={webhookSettings.retryFailedWebhooks}
                    onCheckedChange={(checked) =>
                      setWebhookSettings({
                        ...webhookSettings,
                        retryFailedWebhooks: checked,
                      })
                    }
                  />
                </div>
                {webhookSettings.retryFailedWebhooks && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-retries">Maximum Retries</Label>
                      <Input
                        id="max-retries"
                        type="number"
                        value={webhookSettings.maxRetries}
                        onChange={(e) =>
                          setWebhookSettings({
                            ...webhookSettings,
                            maxRetries: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retry-interval">Retry Interval (seconds)</Label>
                      <Input
                        id="retry-interval"
                        type="number"
                        value={webhookSettings.retryInterval}
                        onChange={(e) =>
                          setWebhookSettings({
                            ...webhookSettings,
                            retryInterval: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveWebhook}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
