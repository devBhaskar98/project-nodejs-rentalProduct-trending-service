import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const TodoLogger = () => {
    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
  
    return createLogger({
      level: 'info',
      // format: winston.format.simple(),
      format: combine(
        format.colorize(),
        label({ label: 'right meow!' }),
        timestamp({ format: "HH:mm:ss" }),
        myFormat
      ),
  
      //defaultMeta: { service: 'user-service' },
      transports: [
        new transports.Console(),
        new transports.File({
          filename: './logs/dev/todo.log',
  
        })
      ],
      defaultMeta: {service: 'todo logger'}
    });
  }
  
  export default TodoLogger;