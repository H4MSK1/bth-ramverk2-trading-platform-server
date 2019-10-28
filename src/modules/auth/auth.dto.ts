import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiModelProperty({ description: 'User email address' })
  readonly username: string;

  @ApiModelProperty({ description: 'User password' })
  readonly password: string;
}
