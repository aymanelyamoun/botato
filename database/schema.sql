Create Table If Not Exists company(
    "id" UUID Default gen_random_uuid() Primary Key Unique,
    "name" Varchar(50) Not Null,
    "location" Text,
    "createdAt" Timestamp Default Now(),
    "updatedat" Timestamp Default Now()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedat" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON company
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

Create Table If Not Exists employee(
    "id" UUID Default gen_random_uuid() Primary Key Unique,
    "firstname" Varchar(18) Not Null,
    "lastname" Varchar(18) Not Null,
    "username" Varchar(30) Not Null Unique,
    -- "gender" Boolean Not Null,
    "email" Varchar(80) Not Null Unique,
    "location" Text,
    "createdAt" Timestamp Default Now(),
    "updatedAt" Timestamp Default Now(),
    -- "isVerified" Smallint Default 0,
    "companyId" UUID,
    "managerId" UUID Default NULL,
    Foreign Key ("companyId") References company("id") On Delete Cascade,
    Foreign Key ("managerId") References employee("id")
);