"use client"

import { useState } from "react"
import { Plus, Edit, Trash, Check, X, DollarSign, Sparkles, Shield, Zap, Clock, Users, Globe } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock plan data
const initialPlans = [
  {
    id: "plan_1",
    name: "Basic",
    description: "For individuals and small projects",
    price: 49,
    billingCycle: "monthly",
    features: [
      { name: "API Calls", limit: 10000, included: true },
      { name: "Storage", limit: 5, unit: "GB", included: true },
      { name: "Bandwidth", limit: 100, unit: "GB", included: true },
      { name: "Team Members", limit: 2, included: true },
      { name: "Priority Support", included: false },
      { name: "Custom Domain", included: false },
    ],
    isPublic: true,
    color: "bg-gray-100 dark:bg-gray-800",
    icon: Clock,
  },
  {
    id: "plan_2",
    name: "Pro",
    description: "For growing teams and businesses",
    price: 199,
    billingCycle: "monthly",
    features: [
      { name: "API Calls", limit: 50000, included: true },
      { name: "Storage", limit: 25, unit: "GB", included: true },
      { name: "Bandwidth", limit: 500, unit: "GB", included: true },
      { name: "Team Members", limit: 10, included: true },
      { name: "Priority Support", included: true },
      { name: "Custom Domain", included: true },
    ],
    isPublic: true,
    color: "bg-blue-100 dark:bg-blue-900/30",
    icon: Zap,
    popular: true,
  },
  {
    id: "plan_3",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: 499,
    billingCycle: "monthly",
    features: [
      { name: "API Calls", limit: 500000, included: true },
      { name: "Storage", limit: 100, unit: "GB", included: true },
      { name: "Bandwidth", limit: 1000, unit: "GB", included: true },
      { name: "Team Members", limit: 50, included: true },
      { name: "Priority Support", included: true },
      { name: "Custom Domain", included: true },
    ],
    isPublic: true,
    color: "bg-purple-100 dark:bg-purple-900/30",
    icon: Sparkles,
  },
]

// Feature icons mapping
const featureIcons = {
  "API Calls": Zap,
  Storage: Shield,
  Bandwidth: Globe,
  "Team Members": Users,
  "Priority Support": Clock,
  "Custom Domain": Globe,
}

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const handleCreatePlan = () => {
    setCurrentPlan({
      id: `plan_${plans.length + 1}`,
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      features: [
        { name: "API Calls", limit: 0, included: true },
        { name: "Storage", limit: 0, unit: "GB", included: true },
        { name: "Bandwidth", limit: 0, unit: "GB", included: true },
        { name: "Team Members", limit: 0, included: true },
        { name: "Priority Support", included: false },
        { name: "Custom Domain", included: false },
      ],
      isPublic: true,
      color: "bg-gray-100 dark:bg-gray-800",
      icon: Clock,
    })
    setEditMode(false)
    setIsDialogOpen(true)
  }

  const handleEditPlan = (plan) => {
    setCurrentPlan(plan)
    setEditMode(true)
    setIsDialogOpen(true)
  }

  const handleDeletePlan = (planId) => {
    setPlans(plans.filter((plan) => plan.id !== planId))
  }

  const handleSavePlan = () => {
    if (editMode) {
      setPlans(plans.map((plan) => (plan.id === currentPlan.id ? currentPlan : plan)))
    } else {
      setPlans([...plans, currentPlan])
    }
    setIsDialogOpen(false)
  }

  const updateFeature = (index, field, value) => {
    const updatedFeatures = [...currentPlan.features]
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    setCurrentPlan({ ...currentPlan, features: updatedFeatures })
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Subscription Plans</h1>
            <p className="page-description">Create and manage your subscription plans</p>
          </div>
          <div className="page-actions">
            <Button onClick={handleCreatePlan}>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="grid" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => {
                const PlanIcon = plan.icon
                return (
                  <Card
                    key={plan.id}
                    className={`dashboard-card relative overflow-hidden border-2 ${plan.popular ? "border-primary" : "border-border"}`}
                  >
                    {plan.popular && (
                      <div className="absolute right-0 top-0">
                        <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Popular
                        </div>
                      </div>
                    )}
                    <CardHeader className={`${plan.color} rounded-t-lg`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90">
                              <PlanIcon className="h-4 w-4 text-foreground" />
                            </div>
                            <CardTitle>{plan.name}</CardTitle>
                          </div>
                          <CardDescription className="mt-1.5">{plan.description}</CardDescription>
                        </div>
                        {!plan.isPublic && <Badge variant="outline">Hidden</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-4 flex items-baseline">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="ml-1 text-muted-foreground">/{plan.billingCycle}</span>
                      </div>
                      <Separator className="my-4" />
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => {
                          const FeatureIcon = featureIcons[feature.name] || Shield
                          return (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5">
                                {feature.included ? (
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                    <Check className="h-3 w-3 text-primary" />
                                  </div>
                                ) : (
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                                    <X className="h-3 w-3 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center text-sm">
                                  <FeatureIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                                  <span>
                                    {feature.name}
                                    {feature.limit
                                      ? `: ${feature.limit.toLocaleString()}${feature.unit ? ` ${feature.unit}` : ""}`
                                      : ""}
                                  </span>
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Plan" : "Create New Plan"}</DialogTitle>
            <DialogDescription>Configure the subscription plan details, pricing, and features.</DialogDescription>
          </DialogHeader>
          {currentPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={currentPlan.name}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      className="pl-8"
                      value={currentPlan.price}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={currentPlan.description}
                  onChange={(e) =>
                    setCurrentPlan({
                      ...currentPlan,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-cycle">Billing Cycle</Label>
                  <Select
                    value={currentPlan.billingCycle}
                    onValueChange={(value) =>
                      setCurrentPlan({
                        ...currentPlan,
                        billingCycle: value,
                      })
                    }
                  >
                    <SelectTrigger id="billing-cycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="public"
                      checked={currentPlan.isPublic}
                      onCheckedChange={(checked) =>
                        setCurrentPlan({
                          ...currentPlan,
                          isPublic: checked,
                        })
                      }
                    />
                    <Label htmlFor="public">Public Plan</Label>
                  </div>
                </div>
              </div>
              <Separator className="my-2" />
              <h3 className="text-lg font-medium">Features</h3>
              <div className="space-y-4">
                {currentPlan.features.map((feature, index) => {
                  const FeatureIcon = featureIcons[feature.name] || Shield
                  return (
                    <div key={index} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 flex items-center gap-2">
                        <FeatureIcon className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`feature-${index}`}
                          value={feature.name}
                          onChange={(e) => updateFeature(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          id={`limit-${index}`}
                          type="number"
                          placeholder="Limit"
                          value={feature.limit || ""}
                          onChange={(e) => updateFeature(index, "limit", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          id={`unit-${index}`}
                          placeholder="Unit (e.g. GB)"
                          value={feature.unit || ""}
                          onChange={(e) => updateFeature(index, "unit", e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`included-${index}`}
                            checked={feature.included}
                            onCheckedChange={(checked) => updateFeature(index, "included", checked)}
                          />
                          <Label htmlFor={`included-${index}`} className="text-sm">
                            Included
                          </Label>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>Save Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
