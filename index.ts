import express from 'express'
import cors from 'cors'

import tasksRoutes from './src/routes/tasks.routes.ts'
import usersRoutes from './src/routes/users.routes.ts'

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use('/tasks', tasksRoutes)
app.use('/users', usersRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})