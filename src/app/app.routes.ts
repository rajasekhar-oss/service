import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard/seeker',
    loadComponent: () =>
      import('./dashboard/seeker-dashboard/seeker-dashboard.component').then(m => m.SeekerDashboardComponent)
  },
  {
    path: 'dashboard/provider',
    loadComponent: () =>
      import('./dashboard/provider-dashboard/provider-dashboard.component').then(m => m.ProviderDashboardComponent)
  },
  {
    path: 'dashboard/admin',
    loadComponent: () =>
      import('./dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./skills/skill-list/skill-list.component').then(m => m.SkillListComponent)
  },
  {
    path: 'skills/:id',
    loadComponent: () =>
      import('./skills/skill-detail/skill-detail.component').then(m => m.SkillDetailComponent)
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./profile/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },
  {
    path: 'profile/:id/edit',
    loadComponent: () =>
      import('./profile/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./booking/booking-list/booking-list.component').then(m => m.BookingListComponent)
  },
  {
    path: 'bookings/:id',
    loadComponent: () =>
      import('./booking/booking-detail/booking-detail.component').then(m => m.BookingDetailComponent)
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat-list/chat-list.component').then(m => m.ChatListComponent)
  },
  {
    path: 'chat/:id',
    loadComponent: () =>
      import('./chat/chat-room/chat-room.component').then(m => m.ChatRoomComponent)
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./support/faq/faq.component').then(m => m.FaqComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./support/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
