import { Router } from 'express';
import authRoutes from './auth';
import designRouter from './design.routes';
import categoryRouter from './category.routes';
import blogsRouter from './blog.routes';
import usersRouter from './user.routes';
import ordersRouter from './order.route';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);
router.use("/designs", designRouter)
router.use("/categories", categoryRouter)
router.use("/blogs", blogsRouter)
router.use("/users", usersRouter)
router.use("/orders", ordersRouter)

export default router;
