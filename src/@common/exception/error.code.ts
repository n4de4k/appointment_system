export class ErrorCode {
  constructor(
    public code: string,
    public message: string,
  ) {}

  static periodStartMoreThanEnd = new ErrorCode(
    'INVALID_PERIOD',
    'Period start must be before period end',
  );

  static noSlotFound = new ErrorCode(
    'NO_SLOT_FOUND',
    'No Slot found for given time',
  );

  static noAvailableSlot = new ErrorCode(
    'NO_AVAILABLE_SLOT',
    'No available slot anymore for the given time',
  );

  static invalidHourFormat = new ErrorCode(
    'INVALID_HOUR_FORMAT',
    'Hour must be in HH:mm format',
  );
}
