import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'

export default function MainRouter() {
  return (
	<BrowserRouter>
		<Routes>
			<Route index element={<MainPage />}/>
		</Routes>
	</BrowserRouter>
  )
}
