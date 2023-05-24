import { Request, Response } from "express";

//models
import Users, { IUser, IUserLogin } from "../models/user.model";

//services
import { UtilService } from "../shared/util.service";
import { UserService } from "../services/user.service";
const userService = new UserService();
const utilService = new UtilService();
const resp = utilService.createApiResponse;

export const get = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (userId.length !== 24)
      return res
        .status(200)
        .json(resp("user/get", 0, "La ID ingresada no existe"));
    await Users.findOne({ _id: userId }).then(
      (userFound) => {
        if (userFound)
          return res
            .status(200)
            .json(
              resp(
                "user/get",
                1,
                "Usuario encontrado.",
                userService.removePassword(userFound)
              )
            );
        return res
          .status(200)
          .json(resp("user/get", 0, "Este usuario no existe."));
      },
      (err) => {
        return res
          .status(200)
          .json(
            resp("user/get", 0, "Error al buscar usuario.", null, err.message)
          );
      }
    );
  } catch (err: any) {
    res
      .status(500)
      .json(
        resp(
          "user/get",
          -1,
          "Error al intentar conectar con el servidor.",
          null,
          err.message
        )
      );
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    await Users.find().then(
      (usersFound) => {
        if (!usersFound.length)
          return res.status(200).json(resp("user/all", 0, "No hay usuarios."));
        return res
          .status(200)
          .json(
            resp(
              "user/all",
              1,
              "Lista de usuarios encontrados.",
              userService.removePasswordArray(usersFound)
            )
          );
      },
      (err) => {
        return res
          .status(200)
          .json(
            resp("user/all", 0, "No se han encontrado usuarios.", err.message)
          );
      }
    );
  } catch (err: any) {
    return res
      .status(500)
      .json(
        resp(
          "user/all",
          -1,
          "Error al intentar conectar con el servidor.",
          null,
          err.message
        )
      );
  }
};

export const login = async (req: Request, res: Response) => {
  setTimeout(async () => {
    try {
      const loginUser: IUserLogin = req.body;
      if (!loginUser.email || !loginUser.password)
        return res
          .status(200)
          .json(resp("user/login", 0, "Debe rellenar todos los campos."));
      await Users.findOne({ email: loginUser.email }).then(
        (userFound) => {
          if (userFound) {
            if (loginUser.password !== userFound.password)
              return res
                .status(200)
                .json(resp("user/login", 0, "Contraseña inválida."));
            return res
              .status(200)
              .json(
                resp(
                  "user/login",
                  1,
                  "Login ok.",
                  userService.removePassword(userFound)
                )
              );
          } else {
            return res
              .status(200)
              .json(resp("user/login", 0, "Usuario no encontrado"));
          }
        },
        (err) => {
          return res
            .status(200)
            .json(
              resp("user/login", 0, "Usuario no encontrado.", null, err.message)
            );
        }
      );
    } catch (err: any) {
      res
        .status(500)
        .json(
          resp(
            "user/login",
            -1,
            "Error al intentar conectar con el servidor.",
            null,
            err.message
          )
        );
    }
  }, 500);
};

export const register = async (req: Request, res: Response) => {
  setTimeout(async () => {
    try {
      const newUser: IUser = req.body;
      if (!newUser.email || !newUser.password || !newUser.name) {
        return res
          .status(200)
          .json(
            resp(
              "user/register",
              0,
              "Necesita completar los campos para continuar."
            )
          );
      }
      await Users.create(newUser).then(
        (newUserCreated) => {
          return res
            .status(200)
            .json(
              resp(
                "user/register",
                1,
                "Usuario registrado correctamente.",
                userService.removePassword(newUserCreated)
              )
            );
        },
        (err) => {
          if (err.code === 11000)
            return res
              .status(200)
              .json(
                resp(
                  "user/register",
                  0,
                  "Este usuario ya se encuentra registrado.",
                  null,
                  err.message
                )
              );
          return res
            .status(200)
            .json(
              resp(
                "user/register",
                0,
                "No fue posible registrar al usuario",
                null,
                err.message
              )
            );
        }
      );
    } catch (err: any) {
      res
        .status(500)
        .json(
          resp(
            "user/register",
            -1,
            "Error al intentar conectar con el servidor.",
            null,
            err.message
          )
        );
    }
  }, 500);
};

export const update = async (req: Request, res: Response) => {
  try {
    if (req.params.id.length !== 24)
      return res
        .status(200)
        .json(resp("user/update", 0, "La ID del usuario no corresponde."));
    const updateUser: IUser = req.body;
    if (!updateUser.email || !updateUser.password || !updateUser.name)
      return res
        .status(200)
        .json(
          resp("user/update", 0, "No se puede actualizar con datos vacíos.")
        );
    await Users.findOne({ _id: req.params.id }).then(
      async () => {
        await Users.findByIdAndUpdate({ _id: updateUser._id }, updateUser, {
          new: true,
        }).then(
          (updateUserResponse) => {
            return res
              .status(200)
              .json(
                resp(
                  "user/update",
                  1,
                  "Usuario actualizado correctamente.",
                  userService.removePassword(updateUserResponse)
                )
              );
          },
          (err) => {
            return res
              .status(200)
              .json(
                resp(
                  "user/update",
                  0,
                  "Error al intentar actualizar usuario",
                  null,
                  err.message
                )
              );
          }
        );
      },
      (err) => {
        return res
          .status(200)
          .json(resp("user/update", 0, "Usuario no encontrado."));
      }
    );
  } catch (err: any) {
    res
      .status(500)
      .json(
        resp(
          "user/update",
          -1,
          "Error al intentar conectar con el servidor.",
          null,
          err.message
        )
      );
  }
};
export const remove = async (req: Request, res: Response) => {
  try {
    if (req.params.id.length !== 24)
      return res
        .status(200)
        .json(resp("user/delete", 0, "La ID del usuario no corresponde."));
    await Users.findOne({ _id: req.params.id }).then(
      async (userFound) => {
        if (userFound) {
          const password = req.body.password;
          if (password !== userFound.password)
            return res
              .status(200)
              .json(resp("user/delete", 0, "Contraseña inválida"));
          await Users.findByIdAndRemove({ _id: req.params.id }).then(
            (deleteUserResponse) => {
              return res
                .status(200)
                .json(
                  resp(
                    "user/delete",
                    1,
                    "Usuario eliminado correctamente.",
                    userService.removePassword(deleteUserResponse)
                  )
                );
            },
            (err) => {
              return res
                .status(200)
                .json(
                  resp(
                    "user/delete",
                    0,
                    "No se pudo eliminar el usuario",
                    null,
                    err.message
                  )
                );
            }
          );
        }
      },
      (err) => {
        return res
          .status(200)
          .json(
            resp(
              "user/delete",
              0,
              "Error al encontrar usuario",
              null,
              err.message
            )
          );
      }
    );
  } catch (err: any) {
    return res
      .status(500)
      .json(
        resp(
          "user/delete",
          -1,
          "Error al intentar conectar con el servidor.",
          null,
          err.message
        )
      );
  }
};
