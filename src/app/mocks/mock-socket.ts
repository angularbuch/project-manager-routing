class MockSocket {
  emit(action: any, data: any) {
  }
}

export function mockIO(): any {
  return new MockSocket();
}
