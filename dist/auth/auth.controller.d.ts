import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/auth/register-user.dto';
import { LoginUserDto } from './login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    registerUser(createUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
}
