import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAnnouncementById = createAsyncThunk(
   'announcement/fetchById',
   async (id) => {
      const response = await axios.get(`/api/announcements/${id}`)
      return response.data
   }
)
