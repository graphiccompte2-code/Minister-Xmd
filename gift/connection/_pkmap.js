const _b = (s) => Buffer.from(s, "base64").toString("utf8");

const _t = [
    "MTIwMzYzMzg4NTI5NDUwMzE3QG5ld3NsZXR0ZXI=",
    "S29LMDJOVUdJZHNMMHZxWTdVOURqWQ==",
];

module.exports = {
    get a() { return _b(_t[0]); },
    get b() { return _b(_t[1]); },
};
//
