/* External */
import { Request, Response, NextFunction } from 'express';

/* Internal */
import logging from '../config/logging';

const NAMESPACE = 'Index Controller';
const getIndex = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Index Route Called - API: Online - Routes Works.`);
    return res.status(200).json({ message: '~ Welcome ~ API: Online' });
};

export default {
    getIndex
};
