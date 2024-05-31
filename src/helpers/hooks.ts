/**
 * Gunakan untuk mempermudah response balik
 */
export function useResponse(
  succes: boolean,
  message: string,
  data?: any,
  // exception: any = NotFoundException,
) {
  // if (!succes) {
  //   throw new exception(
  //     {
  //       succes: succes,
  //       message: message,
  //     },
  //     message,
  //   );
  // }

  if (data) {
    return {
      succes: succes,
      message: message,
      data: data,
    };
  }

  if (!data) {
    return {
      succes: succes,
      message: message,
    };
  }
}

export function pagination(limit: number, page: number) {
  return limit * (page === 1 ? 0 : page - 1);
}
