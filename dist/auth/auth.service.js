"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hash_service_1 = require("../user/hash.service");
const user_schema_1 = require("../user/user.schema");
let AuthService = class AuthService {
    constructor(jwtService, userModel, hashService) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.hashService = hashService;
    }
    async validateUser(email, pass) {
        const user = await this.userModel.findOne({ username: email }).exec();
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = {
            username: user.username,
            sub: user.password,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async getUserByUsername(username) {
        return this.userModel
            .findOne({
            username,
        })
            .exec();
    }
    async registerUser(createUserDto) {
        const createUser = new this.userModel(createUserDto);
        const user = await this.getUserByUsername(createUser.username);
        if (user) {
            return {
                message: 'User already registered',
            };
        }
        createUser.password = await this.hashService.hashPassword(createUser.password);
        createUser.save();
        return {
            message: 'User registered successfully, please login to access your account.',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        hash_service_1.HashService])
], AuthService);
//# sourceMappingURL=auth.service.js.map