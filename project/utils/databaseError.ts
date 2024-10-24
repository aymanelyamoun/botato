export enum PostgresErrorCode {
    UniqueViolation = '23505',
    ForeignKeyViolation = '23503',
    NotNullViolation = '23502',
    CheckViolation = '23514',
    DataTypeMismatch = '22P02',
}

export function mapErrorCodeToStatus(code: string): number {
    switch (code) {
        case PostgresErrorCode.UniqueViolation:
            return 409;
        case
            PostgresErrorCode.ForeignKeyViolation,
            PostgresErrorCode.NotNullViolation,
            PostgresErrorCode.CheckViolation,
            PostgresErrorCode.DataTypeMismatch:
            return 400;
        default:
            return 500;
    }
}

export function getErrorMessage(code: string): string {
    switch (code) {
        case PostgresErrorCode.UniqueViolation:
            return 'Duplicate value.';
        case PostgresErrorCode.ForeignKeyViolation:
            return 'Foreign key constraint.';
        case PostgresErrorCode.NotNullViolation:
            return 'Missing required field.';
        case PostgresErrorCode.CheckViolation:
            return 'Check constraint violated.';
        case PostgresErrorCode.DataTypeMismatch:
            return 'Invalid data type.';
        default:
            return 'Database Error';
    }
}
