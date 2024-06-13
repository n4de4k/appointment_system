import { ErrorCode } from './exception/error.code';
import { ServiceException } from './exception/service.exception';

export function getHourMinute(hourStr: string): {
  hour: number;
  minute: number;
} {
  const components = hourStr.split(':');

  if (components.length != 2)
    throw new ServiceException(ErrorCode.invalidHourFormat);

  const [hour, minute] = components;
  if (!hour || !minute) {
    throw new ServiceException(ErrorCode.invalidHourFormat);
  }

  return {
    hour: +hour,
    minute: +minute,
  };
}
