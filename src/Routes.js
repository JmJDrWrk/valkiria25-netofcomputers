import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import MainHome from './screens/MainHome';

import HomeProjectRoutes from './screens/home/miniroutes'
import ExploreProject from './screens/explore/miniroutes'
import GuitarTunerProject from './screens/guitar-tuner/miniroutes'
import EcoFriendProject from './screens/public/eco-friend/miniroutes'
import BetaTaskPusherProject from './screens/beta-task-pusher/miniroutes'
import TaskConsumer from './screens/beta-task-pusher/taskPuller'
import GuitarScalesRoutes from './screens/public/guitar-scales/miniroutes'
import PNGtoICORoutes from './screens/public/png-to-ico/miniroutes'
import AiImageGenerator from './screens/public/ai-image-generator/miniroutes'
import BandOfTheWeek from './screens/public/bandoftheweek/miniroutes'
import Bjam from './screens/public/bjam/miniroutes'


function AppRoutes() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>

        {/* MAIN DOMAIN */}
        <Route path="/" element={<MainHome />} />

        {/* PER TINY PROJECT */}

        <Route path="/home" element={<HomeProjectRoutes/>} />
        <Route path="/explore" element={<ExploreProject/>} />
        <Route path="/guitar-tuner" element={<GuitarTunerProject/>} />
        <Route path="/eco-friend" element={<EcoFriendProject/>} />
        <Route path="/beta-task-pusher/*" element={<BetaTaskPusherProject/>} />
        <Route path="/beta-task-pusher/pull" element={<TaskConsumer/>} />
        <Route path="/guitar-scales" element={<GuitarScalesRoutes/>} />
        <Route path="/png-to-ico" element={<PNGtoICORoutes/>} />
        <Route path="/bandoftheweek/*" element={<BandOfTheWeek/>} />
        <Route path="/bjam/*" element={<Bjam/>} />
        <Route path="/ai-image-generator/*" element={<AiImageGenerator/>} />

      </Routes>
      {/* <Footer flexGrow={1} /> */}
    </Router>
  );
}

export default AppRoutes;
