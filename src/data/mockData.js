// Mock data for DrHair Progress app

export const mockUser = {
  id: 'u1',
  name: 'James Thornton',
  firstName: 'James',
  email: 'james.thornton@email.com',
  initials: 'JT',
  memberSince: 'January 2025',
};

export const mockPlans = [
  {
    id: 'plan1',
    name: 'Minoxidil Programme',
    startDate: '2025-01-12',
    durationDays: 180,
    durationLabel: '6 Months',
    intervalDays: 14,
    progress: 65,
    status: 'active',
    totalIntervals: 13,
    completedIntervals: 6,
    nextDue: { day: 84, label: 'Day 84 — Due Today', urgent: true },
    notes: 'Apply 5% minoxidil twice daily. Monitor Crown and Temple areas.',
    intervals: generateIntervals(180, 14, '2025-01-12', 6),
  },
  {
    id: 'plan2',
    name: 'Finasteride + Topical',
    startDate: '2025-03-03',
    durationDays: 365,
    durationLabel: '12 Months',
    intervalDays: 30,
    progress: 25,
    status: 'active',
    totalIntervals: 12,
    completedIntervals: 3,
    nextDue: { day: 90, label: 'Day 90 — Upcoming in 5 days', urgent: false },
    notes: 'Finasteride 1mg daily + topical minoxidil 5%.',
    intervals: generateIntervals(365, 30, '2025-03-03', 3),
  },
  {
    id: 'plan3',
    name: 'PRP Post-Treatment',
    startDate: '2024-11-20',
    durationDays: 90,
    durationLabel: '3 Months',
    intervalDays: 7,
    progress: 100,
    status: 'completed',
    totalIntervals: 13,
    completedIntervals: 13,
    nextDue: null,
    notes: 'Post-PRP recovery monitoring.',
    intervals: generateIntervals(90, 7, '2024-11-20', 13),
  },
];

function generateIntervals(totalDays, intervalDays, startDateStr, uploadedCount) {
  const intervals = [];
  const startDate = new Date(startDateStr);
  let dayNum = 1;
  let index = 0;

  while (dayNum <= totalDays) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayNum - 1);

    let status;
    if (index < uploadedCount) {
      status = 'uploaded';
    } else if (index === uploadedCount) {
      status = 'due';
    } else {
      status = 'locked';
    }

    intervals.push({
      id: `int-${dayNum}`,
      day: dayNum,
      date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      isoDate: date.toISOString().split('T')[0],
      status,
    });

    dayNum += intervalDays;
    index++;
  }

  return intervals;
}

export const thumbnailColors = [
  '#0EA5E9', '#0369A1', '#7DD3FC', '#0D9488', '#1E293B', '#38BDF8',
  '#0EA5E9', '#0369A1', '#7DD3FC', '#0D9488', '#1E293B', '#38BDF8',
];

export const mockNotifications = [
  {
    id: 'n1',
    title: 'Day 84 Upload Reminder',
    body: 'Minoxidil Programme: Your progress photo is due today. Keep your streak going!',
    time: 'Just now',
    color: '#F59E0B',
    type: 'amber',
  },
  {
    id: 'n2',
    title: 'Day 84 Upload Reminder',
    body: "Still waiting on your Day 84 photo. Don't miss your interval!",
    time: '2 hours ago',
    color: '#F59E0B',
    type: 'amber',
  },
  {
    id: 'n3',
    title: 'Day 70 Uploaded',
    body: 'Great job! Day 70 progress saved successfully.',
    time: '14 days ago',
    color: '#27AE60',
    type: 'green',
  },
  {
    id: 'n4',
    title: 'Day 90 Upcoming',
    body: 'Finasteride + Topical: Day 90 check-in in 5 days.',
    time: 'Yesterday',
    color: '#2196F3',
    type: 'blue',
  },
  {
    id: 'n5',
    title: 'Plan Completed',
    body: "PRP Post-Treatment: You've completed all 12 intervals! Export your report.",
    time: '2 months ago',
    color: '#2D6A4F',
    type: 'teal',
  },
];
