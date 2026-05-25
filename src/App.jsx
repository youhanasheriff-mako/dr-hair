import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import PlanDetailScreen from './screens/PlanDetailScreen'
import ExportReportScreen from './screens/ExportReportScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import ProfileScreen from './screens/ProfileScreen'
import BottomNav from './components/BottomNav'
import CreatePlanSheet from './components/CreatePlanSheet'
import { mockPlans } from './data/mockData'

export default function App() {
  const location = useLocation()
  const [plans, setPlans] = useState(mockPlans)
  const [showCreatePlan, setShowCreatePlan] = useState(false)

  const showNav = !['/splash', '/login', '/signup', '/'].includes(location.pathname) &&
    !location.pathname.startsWith('/plan/') &&
    !location.pathname.startsWith('/export/')

  const handleCreatePlan = (newPlan) => {
    setPlans(prev => [newPlan, ...prev])
    setShowCreatePlan(false)
  }

  const updatePlanInterval = (planId, intervalDay) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p
      const updatedIntervals = p.intervals.map(i => {
        if (i.day === intervalDay) return { ...i, status: 'uploaded' }
        if (i.status === 'due') return i
        return i
      })
      // Mark next locked interval as due
      let foundUploaded = false
      const finalIntervals = updatedIntervals.map(i => {
        if (i.day === intervalDay) { foundUploaded = true; return i }
        if (foundUploaded && i.status === 'locked') {
          foundUploaded = false
          return { ...i, status: 'due' }
        }
        return i
      })
      const completedCount = finalIntervals.filter(i => i.status === 'uploaded').length
      const progress = Math.round((completedCount / finalIntervals.length) * 100)
      return { ...p, intervals: finalIntervals, completedIntervals: completedCount, progress }
    }))
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/home" element={<HomeScreen plans={plans} onNewPlan={() => setShowCreatePlan(true)} />} />
        <Route path="/plan/:planId" element={<PlanDetailScreen plans={plans} onUpload={updatePlanInterval} />} />
        <Route path="/export/:planId" element={<ExportReportScreen plans={plans} />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>

      {showNav && (
        <BottomNav onNewPlan={() => setShowCreatePlan(true)} />
      )}

      {showCreatePlan && (
        <CreatePlanSheet
          onClose={() => setShowCreatePlan(false)}
          onCreate={handleCreatePlan}
        />
      )}
    </div>
  )
}
