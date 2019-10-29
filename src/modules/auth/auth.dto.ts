import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiModelProperty({ description: 'User email address' })
  username: string;

  @ApiModelProperty({ description: 'User password' })
  password: string;
}
