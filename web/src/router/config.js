import HomeView from '@/views/home/HomeView.vue';
import CenterView from '@/views/center/CenterView.vue';
import UserAddView from '@/views/user-manage/UserAddView.vue';
import UserListView from '@/views/user-manage/UserListView.vue';
import ActivityAddView from '@/views/activity-manage/ActivityAddView.vue'
import ActivityListView from '@/views/activity-manage/ActivityListView.vue';
import MemberAddView from '@/views/member-manage/MemberAddView.vue';
import MemberListView from '@/views/member-manage/MemberListView.vue';
import LevelAddView from '@/views/menberlevel-manage/LevelAddView.vue';
import LevelListView from '@/views/menberlevel-manage/LevelListView.vue';
import NotFoundView from '@/views/notfound/NotFoundView.vue';

const routes = [
  {
    path: '/index',
    component: HomeView,
  },
  {
    path: '/center',
    component: CenterView,
  },
  {
    path: '/user-manage/adduser',
    component: UserAddView,
    requireAdmin: true
  },
  {
    path: '/user-manage/userlist',
    component: UserListView,
    requireAdmin: true
  },
  {
    path: '/member-manage/addmember',
    component: MemberAddView,
  },
  {
    path: '/memberlevel-manage/addlevel',
    component: LevelAddView,
  },
  {
    path: '/memberlevel-manage/levellist',
    component: LevelListView,
  },
  {
    path: '/member-manage/memberlist',
    component: MemberListView,
  },
  {
    path: '/activity-manage/addactivity',
    component: ActivityAddView,
  },
  {
    path: '/activity-manage/activitylist',
    component: ActivityListView,
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,

  }

];

export default routes;
