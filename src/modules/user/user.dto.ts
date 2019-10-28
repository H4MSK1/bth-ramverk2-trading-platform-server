import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiModelProperty({ description: 'User email address' })
  email: string;

  @ApiModelProperty({ description: 'User password' })
  password: string;

  @ApiModelProperty({ description: 'User first name' })
  first_name: string;

  @ApiModelProperty({ description: 'User last name' })
  last_name: string;
}
