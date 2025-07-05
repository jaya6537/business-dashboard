"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MessageSquare,
  Sparkles,
  Building2,
  TrendingUp,
  Users,
  Globe,
  Zap,
  BarChart3,
  Target,
  Rocket,
  Crown,
  Shield,
  RefreshCw,
} from "lucide-react"

interface BusinessData {
  rating: number
  reviews: number
  headline: string
}

export default function Dashboard() {
  const [businessName, setBusinessName] = useState("")
  const [location, setLocation] = useState("")
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({})

  const validateForm = () => {
    const newErrors: { name?: string; location?: string } = {}

    if (!businessName.trim()) {
      newErrors.name = "Business name is required"
    }

    if (!location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/business-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: businessName,
          location: location,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch business data")
      }

      const data = await response.json()
      setBusinessData(data)
    } catch (error) {
      console.error("Error fetching business data:", error)
      alert("Failed to fetch business data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerateHeadline = async () => {
    if (!businessData) return

    setIsRegenerating(true)

    try {
      const response = await fetch(
        `/api/regenerate-headline?name=${encodeURIComponent(businessName)}&location=${encodeURIComponent(location)}`,
      )

      if (!response.ok) {
        throw new Error("Failed to regenerate headline")
      }

      const data = await response.json()
      setBusinessData((prev) => (prev ? { ...prev, headline: data.headline } : null))
    } catch (error) {
      console.error("Error regenerating headline:", error)
      alert("Failed to regenerate headline. Please try again.")
    } finally {
      setIsRegenerating(false)
    }
  }

  const resetAnalysis = () => {
    setBusinessName("")
    setLocation("")
    setBusinessData(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  GrowthProAI
                </h1>
                <Badge variant="secondary" className="mt-2 bg-purple-500/20 text-purple-200 border-purple-500/30">
                  <Crown className="h-3 w-3 mr-1" />
                  Professional Dashboard
                </Badge>
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-2">AI-Powered Business Intelligence Platform</p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform your local business with cutting-edge analytics, AI-generated content, and actionable insights
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Users, label: "Active Users", value: "10K+", color: "from-blue-500 to-cyan-500" },
              { icon: TrendingUp, label: "Growth Rate", value: "150%", color: "from-green-500 to-emerald-500" },
              { icon: Globe, label: "Cities", value: "500+", color: "from-purple-500 to-pink-500" },
              { icon: Target, label: "Success Rate", value: "98%", color: "from-orange-500 to-red-500" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form - Consistent Height */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  Business Analysis Setup
                  <Badge variant="outline" className="ml-auto border-green-500/50 text-green-400">
                    <Zap className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
                <p className="text-gray-400 text-sm">Enter your business details to unlock powerful insights</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="businessName" className="text-gray-200 font-medium">
                      Business Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="businessName"
                        type="text"
                        placeholder="e.g., Cake & Co, Tech Solutions Inc."
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 h-12 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      <Building2 className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-gray-200 font-medium">
                      Location
                    </Label>
                    <div className="relative">
                      <Input
                        id="location"
                        type="text"
                        placeholder="e.g., Mumbai, New York, London"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 h-12 ${
                          errors.location ? "border-red-500" : ""
                        }`}
                      />
                      <Globe className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
                    </div>
                    {errors.location && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Analyzing Business Intelligence...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5" />
                        <span>Generate Business Insights</span>
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Feature highlights - Always visible */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {[
                    { icon: Star, text: "Rating Analysis" },
                    { icon: MessageSquare, text: "Review Insights" },
                    { icon: Sparkles, text: "AI Headlines" },
                    { icon: TrendingUp, text: "Growth Metrics" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                      <feature.icon className="h-4 w-4 text-purple-400" />
                      {feature.text}
                    </div>
                  ))}
                </div>

                {/* Platform Benefits - Always visible for consistent height */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-400" />
                    Platform Benefits
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { icon: Zap, text: "Instant AI-powered analysis", color: "text-yellow-400" },
                      { icon: Shield, text: "Enterprise-grade security", color: "text-blue-400" },
                      { icon: TrendingUp, text: "Real-time market insights", color: "text-green-400" },
                      { icon: Globe, text: "Global business intelligence", color: "text-purple-400" },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <benefit.icon className={`h-4 w-4 ${benefit.color}`} />
                        <span className="text-sm text-gray-300">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Action - Only show when results exist */}
                {businessData && (
                  <div className="pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                      onClick={resetAnalysis}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Analyze New Business
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Display Card - Matches form height */}
            {businessData ? (
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 [&>*]:bg-transparent">
                <CardHeader className="pb-4 bg-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      Business Intelligence Report
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Live Data
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{businessName}</span>
                    <span className="text-gray-500">•</span>
                    <Globe className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 bg-transparent">
                  {/* Business Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                            <Star className="h-5 w-5 text-white" />
                          </div>
                          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                            Excellent
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{businessData.rating}</div>
                        <div className="text-sm text-gray-400">Google Rating</div>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(businessData.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                            <MessageSquare className="h-5 w-5 text-white" />
                          </div>
                          <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10">
                            Active
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{businessData.reviews}</div>
                        <div className="text-sm text-gray-400">Customer Reviews</div>
                        <div className="text-xs text-blue-400 mt-2">+12% this month</div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Headline Section */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">AI-Generated SEO Headline</h3>
                        <p className="text-sm text-gray-400">Optimized for maximum engagement</p>
                      </div>
                      <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/30">
                        <Zap className="h-3 w-3 mr-1" />
                        AI Powered
                      </Badge>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
                      <div className="relative bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <p className="text-white font-medium leading-relaxed text-lg">{businessData.headline}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleRegenerateHeadline}
                      variant="outline"
                      className="w-full h-12 bg-transparent border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300"
                      disabled={isRegenerating}
                    >
                      {isRegenerating ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-400 border-t-transparent" />
                          <span>Generating New Headline...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5" />
                          <span>Regenerate SEO Headline</span>
                          <div className="ml-auto flex gap-1">
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-200"></div>
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
                          </div>
                        </div>
                      )}
                    </Button>
                  </div>

                  {/* Performance Insights */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-cyan-400" />
                      Performance Insights
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "SEO Score", value: "94/100", color: "text-green-400" },
                        { label: "Visibility", value: "High", color: "text-blue-400" },
                        { label: "Engagement", value: "+23%", color: "text-purple-400" },
                      ].map((metric, index) => (
                        <div key={index} className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Position */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-400" />
                      Market Position
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { label: "Competitive Advantage", status: "Strong", color: "text-green-400" },
                        { label: "Brand Recognition", status: "Growing", color: "text-blue-400" },
                        { label: "Customer Loyalty", status: "High", color: "text-purple-400" },
                        { label: "Market Share", status: "Expanding", color: "text-yellow-400" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <span className="text-sm text-gray-300">{item.label}</span>
                          <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 border-dashed hover:border-white/20 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-purple-400" />
                    </div>
                    Ready to Analyze
                  </CardTitle>
                  <p className="text-gray-400 text-sm">Your comprehensive business report will appear here</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 inline-block">
                      <BarChart3 className="h-12 w-12 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Business Intelligence Awaits</h3>
                    <p className="text-gray-400 max-w-sm mx-auto mb-6">
                      Enter your business information to generate comprehensive insights and AI-powered recommendations
                    </p>
                  </div>

                  {/* Preview of what will be shown */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      What You'll Get
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: Star, text: "Google rating analysis", color: "text-yellow-400" },
                        { icon: MessageSquare, text: "Customer review insights", color: "text-blue-400" },
                        { icon: Sparkles, text: "AI-generated SEO headlines", color: "text-purple-400" },
                        { icon: TrendingUp, text: "Market position assessment", color: "text-green-400" },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <feature.icon className={`h-4 w-4 ${feature.color}`} />
                          <span className="text-sm text-gray-300">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Placeholder metrics */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-cyan-400" />
                      Sample Insights
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "SEO Score", value: "---", color: "text-gray-500" },
                        { label: "Visibility", value: "---", color: "text-gray-500" },
                        { label: "Engagement", value: "---", color: "text-gray-500" },
                      ].map((metric, index) => (
                        <div
                          key={index}
                          className="text-center p-3 bg-white/5 rounded-lg border border-white/10 opacity-50"
                        >
                          <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-16 pb-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              {[
                { icon: Shield, text: "Enterprise Security" },
                { icon: Zap, text: "Real-time Analytics" },
                { icon: Globe, text: "Global Coverage" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                  <feature.icon className="h-4 w-4 text-purple-400" />
                  {feature.text}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 GrowthProAI - Empowering Local Businesses with Advanced AI Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
